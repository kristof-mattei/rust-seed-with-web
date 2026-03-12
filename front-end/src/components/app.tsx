import type React from "react";
import { useEffect, useState } from "react";

import { ExerciseForm } from "@/components/exercise-form.tsx";
import { ExerciseList } from "@/components/exercise-list.tsx";
import { MachineList } from "@/components/machine-list.tsx";
import { getExercises, getMachines } from "@/services/mock-api.ts";
import type { Exercise, Machine } from "@/types/fitness.tsx";

type AppView =
    | { kind: "exercises"; machine: Machine }
    | { kind: "form"; machine: Machine; exercise: Exercise }
    | { kind: "machines" };

export const App: React.FC = () => {
    const [view, setView] = useState<AppView>({ kind: "machines" });
    const [machines, setMachines] = useState<Machine[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        void getMachines().then(setMachines);
    }, []);

    const handleSelectMachine = (machine: Machine) => {
        void getExercises(machine.id).then((list) => {
            setExercises(list);
            setView({ kind: "exercises", machine });
        });
    };

    const handleSelectExercise = (exercise: Exercise) => {
        if (view.kind !== "exercises") {
            return;
        }
        setView({ kind: "form", machine: view.machine, exercise });
    };

    let content: React.ReactNode;

    if (view.kind === "machines") {
        content = <MachineList machines={machines} onSelect={handleSelectMachine} />;
    } else if (view.kind === "exercises") {
        const { machine } = view;
        content = (
            <ExerciseList
                machine={machine}
                exercises={exercises}
                onSelect={handleSelectExercise}
                onBack={() => {
                    setView({ kind: "machines" });
                }}
            />
        );
    } else {
        const { machine, exercise } = view;
        content = (
            <ExerciseForm
                machine={machine}
                exercise={exercise}
                onBack={() => {
                    setView({ kind: "exercises", machine });
                }}
            />
        );
    }

    return <div className="max-w-lg mx-auto">{content}</div>;
};
