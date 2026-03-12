export interface Machine {
    id: string;
    name: string;
}

export interface Exercise {
    id: string;
    machineId: string;
    name: string;
}

export interface ExerciseRecord {
    id: string;
    exerciseId: string;
    lbs: number;
    sets: number;
    reps: number;
    timestamp: string;
}

export interface ExerciseMax {
    lbs: number;
    sets: number;
    reps: number;
}
