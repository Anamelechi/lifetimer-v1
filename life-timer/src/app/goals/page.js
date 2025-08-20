"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useGoalsStore, computeTargetDate, diffTo } from "@/store/goalsStore";
import { useTimerStore } from "@/store/timerStore";

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, removeGoal } = useGoalsStore();
  const { birthDate } = useTimerStore();
  const [nowTick, setNowTick] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNowTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showAddForm) {
        setShowAddForm(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setShowAddForm(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAddForm]);

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/" />
          <h1 className="text-xl font-semibold">Goals</h1>
          <span className="w-[64px]" />
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Add Goal Button/Section */}
          <div className="space-y-3">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-lg py-4 px-4 transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>{showAddForm ? 'Cancel' : 'Add Goal'}</span>
              <span className={`transform transition-transform duration-200 ${showAddForm ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            
            {showAddForm && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <GoalForm onAdd={(goal) => { addGoal(goal); setShowAddForm(false); }} hasBirthDate={!!birthDate} />
              </div>
            )}
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white/90 font-medium">Your Goals</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                  {goals.length} goal{goals.length !== 1 ? 's' : ''}
                </span>
                <span className="text-xs text-white/40 hidden sm:block">
                  Cmd+N to add
                </span>
              </div>
            </div>
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-white/70 text-sm mb-3">No goals yet.</p>
                <p className="text-white/60 text-xs">Click &quot;Add Goal&quot; above to set your first target!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.map((g) => (
                  <GoalItem key={g.id} goal={g} birthDate={birthDate} onUpdate={updateGoal} onRemove={removeGoal} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function GoalForm({ onAdd, hasBirthDate }) {
  const [type, setType] = useState("age");
  const [label, setLabel] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [iso, setIso] = useState("");
  const [customType, setCustomType] = useState("");

  const canSubmit = useMemo(() => {
    if (!label.trim()) return false;
    if (type === "age") return hasBirthDate && !!parseInt(age, 10);
    if (type === "year") return !!parseInt(year, 10);
    if (type === "event" || type === "custom") return !!iso;
    return false;
  }, [type, label, age, year, iso, hasBirthDate]);

  const submit = () => {
    if (!canSubmit) return;
    const payload = { type, label: label.trim() };
    if (type === "age") payload.age = parseInt(age, 10);
    if (type === "year") payload.year = parseInt(year, 10);
    if (type === "event" || type === "custom") payload.targetIso = iso;
  if (type === "custom" && customType.trim()) payload.customType = customType.trim();
    onAdd(payload);
  setLabel(""); setAge(""); setYear(""); setIso(""); setCustomType("");
  };

  return (
    <div className="space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm text-white/80">
          Type
          <select className="mt-1 w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="age">Age</option>
            <option value="event">Event</option>
            <option value="year">Year</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <label className="block text-sm text-white/80">
          Label
          <input type="text" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g., 30th Birthday" />
        </label>
      </div>

      {type === "age" && (
        <label className="block text-sm text-white/80">
          Age
          <input type="number" min="1" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" />
        </label>
      )}

      {type === "year" && (
        <label className="block text-sm text-white/80">
          Year
          <input type="number" min="1900" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., 2030" />
        </label>
      )}

      {(type === "event" || type === "custom") && (
        <label className="block text-sm text-white/80">
          Target Date/Time (local)
          <input type="datetime-local" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={iso} onChange={(e) => setIso(e.target.value)} />
        </label>
      )}

      {type === "custom" && (
        <label className="block text-sm text-white/80">
          Type name (optional)
          <input type="text" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={customType} onChange={(e) => setCustomType(e.target.value)} placeholder="e.g., Wedding, Launch, Marathon" />
        </label>
      )}

      <button onClick={submit} disabled={!canSubmit} className="w-full bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed">Add Goal</button>
    </div>
  );
}

function GoalItem({ goal, birthDate, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [etype, setEtype] = useState(goal.type);
  const [eage, setEage] = useState(goal.age?.toString?.() || "");
  const [eyear, setEyear] = useState(goal.year?.toString?.() || "");
  const [eiso, setEiso] = useState(goal.targetIso || "");
  const [ecustom, setEcustom] = useState(goal.customType || "");

  const target = computeTargetDate(goal, birthDate);
  const diff = diffTo(target);

  const resetEdit = () => {
    setEditing(false);
    setEtype(goal.type);
    setEage(goal.age?.toString?.() || "");
    setEyear(goal.year?.toString?.() || "");
    setEiso(goal.targetIso || "");
  setEcustom(goal.customType || "");
  };

  const save = () => {
    const patch = { type: etype };
    if (etype === 'age') patch.age = parseInt(eage, 10);
    if (etype === 'year') patch.year = parseInt(eyear, 10);
  if (etype === 'event' || etype === 'custom') patch.targetIso = eiso;
  if (etype === 'custom') patch.customType = ecustom?.trim() || undefined;
    // Clear unrelated fields to avoid stale data
    if (etype !== 'age') patch.age = undefined;
    if (etype !== 'year') patch.year = undefined;
    if (etype !== 'event' && etype !== 'custom') patch.targetIso = undefined;
    onUpdate(goal.id, patch);
    setEditing(false);
  };

  const canSave = (() => {
    if (etype === 'age') return !!parseInt(eage, 10);
    if (etype === 'year') return !!parseInt(eyear, 10);
    if (etype === 'event' || etype === 'custom') return !!eiso;
    return false;
  })();

  return (
    <div className="panel rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          {!editing ? (
            <>
              <div
                className="text-xs text-white/60 tracking-widest underline underline-offset-2 cursor-pointer"
                onClick={() => setEditing(true)}
                title="Click to edit type"
              >
                {goal.type === 'custom' && goal.customType ? goal.customType.toUpperCase() : goal.type.toUpperCase()}
              </div>
              <div className="text-lg text-accent">{goal.label}</div>
              <div className="text-xs text-white/50">{target ? target.toLocaleString() : '—'}</div>
            </>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs text-white/70">
                  Type
                  <select className="mt-1 w-full bg-black/30 border border-white/20 rounded px-2 py-1.5 text-xs focus:outline-none" value={etype} onChange={(e) => setEtype(e.target.value)}>
                    <option value="age">Age</option>
                    <option value="event">Event</option>
                    <option value="year">Year</option>
                    <option value="custom">Custom</option>
                  </select>
                </label>
                <div className="flex items-end justify-end gap-2">
                  <button onClick={resetEdit} className="text-xs text-white/60 hover:text-white">Cancel</button>
                  <button onClick={save} disabled={!canSave} className="text-xs bg-black text-white border border-white/30 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed">Save</button>
                </div>
              </div>
              {etype === 'age' && (
                <label className="block text-xs text-white/70">
                  Age
                  <input type="number" min="1" className="mt-1 w-full bg-transparent border border-white/20 rounded px-2 py-1.5 text-sm focus:outline-none" value={eage} onChange={(e) => setEage(e.target.value)} />
                </label>
              )}
              {etype === 'year' && (
                <label className="block text-xs text-white/70">
                  Year
                  <input type="number" min="1900" className="mt-1 w-full bg-transparent border border-white/20 rounded px-2 py-1.5 text-sm focus:outline-none" value={eyear} onChange={(e) => setEyear(e.target.value)} />
                </label>
              )}
              {(etype === 'event' || etype === 'custom') && (
                <label className="block text-xs text-white/70">
                  Target Date/Time (local)
                  <input type="datetime-local" className="mt-1 w-full bg-transparent border border-white/20 rounded px-2 py-1.5 text-sm focus:outline-none" value={eiso} onChange={(e) => setEiso(e.target.value)} />
                </label>
              )}
              {etype === 'custom' && (
                <label className="block text-xs text-white/70">
                  Type name (optional)
                  <input type="text" className="mt-1 w-full bg-transparent border border-white/20 rounded px-2 py-1.5 text-sm focus:outline-none" value={ecustom} onChange={(e) => setEcustom(e.target.value)} placeholder="e.g., Wedding, Launch, Marathon" />
                </label>
              )}
            </div>
          )}
        </div>
        <button onClick={() => onRemove(goal.id)} className="text-xs text-white/60 hover:text-white">Remove</button>
      </div>
      {!editing && diff && (
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          <MiniStat label="DAYS" value={diff.days} />
          <MiniStat label="HRS" value={diff.hours} />
          <MiniStat label="MIN" value={diff.minutes} />
          <MiniStat label="SEC" value={diff.seconds} />
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 py-3">
      <div className="mono text-xl text-accent">{value ?? '–'}</div>
      <div className="mt-0.5 text-[10px] tracking-[0.25em] text-white/60">{label}</div>
    </div>
  );
}
