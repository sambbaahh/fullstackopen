export const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');

    }
    const bmi = weight / ((height / 100) ^ 2);
    if (bmi < 18.5) {
        return "Underweight (unhealthy weight)";
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return "Normal (healthy weight)";
    } else {
        return "Overweight/obese (unhealthy weight)";
    }
};

console.log(calculateBmi(180, 74));