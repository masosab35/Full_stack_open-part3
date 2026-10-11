
const calculateRange = (bmi:number):string|Error => {
    if (bmi < 16) {
        return "Your range is:Underweight (Severe thinness)";
    } else if (bmi < 17) {
        return "Your range is:Underweight (Moderate thinness)";
    } else if (bmi < 18.5) {
        return "Your range is:Underweight (Mild thinness)";
    } else if (bmi < 25) {
        return "Your range is:Normal range";
    } else if (bmi < 30) {
        return "Your range is:Overweight (Pre-obese)";
    } else if (bmi < 35) {
        return "Your range is:Obese (Class I)";
    } else if (bmi < 40) {
        return "Your range is:Obese (Class II)";
    } else if (bmi >= 40) {
        return "Your range is:Obese (Class III)";
    }else{
        return new Error('Invalid BMI value');
    }
};

const calculateBmi = (height:number, weight:number):number|Error => {
    if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
    throw new Error("malformatted parameters");
  }

    const heightInMeters : number = height / 100;
    const bmi : number = weight / (heightInMeters * heightInMeters);
    
    return bmi;
};

const corriendoEnConsola = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (corriendoEnConsola) {


if (process.argv.length < 4) {
    console.log('Not enough arguments');
    process.exit(1);
}
else{
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    const bmi = calculateBmi(height, weight);
    if (!(bmi instanceof Error)) {
        console.log(bmi, calculateRange(bmi));
    }
    
}
};
export { calculateBmi, calculateRange } ;