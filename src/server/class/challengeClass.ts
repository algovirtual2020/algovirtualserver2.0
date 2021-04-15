export default class ChallengeClass{
    public correct: boolean; 
    public attempsCorrect: number;
    public attempsIncorrect: number;

    constructor(correct:boolean,attempsCorrect:number,attempsIncorrect:number ){
        this.correct = correct;
        this.attempsCorrect= attempsCorrect;
        this.attempsIncorrect= attempsIncorrect;
    }
}

