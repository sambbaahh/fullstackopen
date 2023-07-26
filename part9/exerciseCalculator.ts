import { isNotNumber } from "./utils";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (trainingDiary: number[], target: number): Result => {
    let trainingDays: number = 0;
    let sumHours: number = 0;
    let isSuccess: boolean = true;
    let rating: number = 3;
    let ratingDescription: string = "You made it, Keep going!";

    trainingDiary.forEach((hours: number) => {
        if (hours > 0) trainingDays++;
        sumHours += hours;
    });

    const avgHours: number = sumHours / trainingDiary.length;

    if (avgHours < target) {
        isSuccess = false;
        if (target < avgHours * 1.2) {
            rating = 2;
            ratingDescription = "not too bad but could be better";
        } else {
            rating = 1;
            ratingDescription = "Next time you will make it!";
        }
    }
    const returnResult: Result = {
        periodLength: trainingDiary.length,
        trainingDays: trainingDays,
        success: isSuccess,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avgHours
    };
    return returnResult;
};

try {
    //needs to have at least one training session
    if(process.argv.length > 3){
        const target: number = Number(process.argv[2]);
        const trainingDiary: number[] = [];
        for (let i = 3; i < process.argv.length; i++) {
            trainingDiary.push(Number(process.argv[i]));
        }
        isNotNumber(trainingDiary, target);
        console.log(calculateExercises(trainingDiary, target));
    } else {
        console.log(process.argv.length);
        console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

    }
  } catch (error: unknown) {
    let errorMessage: string = "";
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }