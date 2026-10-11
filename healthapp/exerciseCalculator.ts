const calculateExercises = (dias: number[], objetivo: number):object => {
    const promedio: number = dias.reduce((a, b) => a + b, 0) / dias.length;
    const objetivoCumplido: boolean = promedio >= objetivo? true : false;
    const objetoFinal: object= { 
    periodLength: dias.length,
    trainingDays: dias.filter(dia => dia > 0).length,
    success: objetivoCumplido,
    rating: 2,
    ratingDescription: 'Lo hiciste bien, pero podrias mejorar',
    target: objetivo,
    average: promedio};
    return objetoFinal;
};
if (process.argv.length < 4 && process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
    console.log('Not enough arguments');
    process.exit(1);
}
else if (process.argv.length > 4) {
    const dias: number[] = process.argv.slice(3, process.argv.length).map(p =>Number(p));
    const objetivo: number = Number(process.argv[2]);
    console.log(calculateExercises(dias, objetivo));
}


export default calculateExercises;