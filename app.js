const { createApp } = Vue

createApp({
  data() {
    return {
      answersArray: ["","","",""],
      panesArray: [
        "", "" , "" , "",
        "", "" , "" , "",
        "", "" , "" , "",
      ],
      elapsedTime: 0,
      answersArePlaced: false,
      answer: 0,
      problem: "",
      points: 0,
      level: 0,
      timeCreated: Date.now(),
    }
  },
  methods: {
    setLevel() {
      switch(this.points) {
        case 0:
          this.level = 0;
          break;
        case 3:
          this.level = 1;
          break;
        case 6:
          this.level = 2;
          break;
        case 9:
          this.level = 3;
          break; 
        case 12:
          this.level = 4;
          break;  
        case 15:
          this.level = 5;
          break;  
        case 18:
          this.level = 6;
          break;  
        case 21:
          this.level = 7;
          break;        
        case 24:
          this.level = 8;
          break;
        case 27:
          this.level = 9;
          break;        
        case 30:
          this.level = 10;
          break;
        default:
          this.level = this.level;
          break;               
      }
    },
    makeProblem() {
      const minimizeTo2DecimalPlaces = (answer) => {
        const answerAsString = answer.toString();
        const index = answerAsString.indexOf(".");
        if (answerAsString.length - index - 1 > 2) {
          this.makeProblem();
        }
      }
      this.setLevel();
      if (this.level === 0) {
        let int1 = Math.floor(Math.random()*10);
        let int2 = Math.floor(Math.random()*10);          
        this.problem = `${int1} + ${int2}`;
        this.answer = int1 + int2;
      } 
      else if (this.level === 1) {
        let int1 = Math.floor(Math.random()*10);
        let int2 = Math.floor(Math.random()*10);       
        let int3 = Math.floor(Math.random()*10);          
        this.problem = `${int1} + ${int2} + ${int3}`;
        this.answer = int1 + int2 + int3;
      }
      else if (this.level === 2) {
        let int1 = Math.floor(Math.random()*10);
        let int2 = Math.floor(Math.random()*10);                 
        this.problem = `${int1} x ${int2}`;
        this.answer = int1 * int2;
      }
      else if (this.level === 3) {
        let int1 = Math.floor(Math.random()*10);
        let int2 = Math.floor(Math.random()*10);
        let int3 = Math.floor(Math.random()*10);                 
        this.problem = `${int1} x ${int2} x ${int3}`;
        this.answer = int1 * int2 * int3;
      }
      else if (this.level === 4) {
        let int1 = Math.floor(Math.random()*10);
        let int2 = Math.floor(Math.random()*10);
        let int3 = Math.floor(Math.random()*10);
        const isMultiSignFirst = .5 <= Math.random(); 
        if (isMultiSignFirst) {
          this.problem = `${int1} x ${int2} / ${int3}`;
          this.answer = int1 * int2 / int3;

          minimizeTo2DecimalPlaces(this.answer)
        }   
        else {
          this.problem = `${int1} / ${int2} x ${int3}`;
          this.answer = int1 / int2 * int3;

          minimizeTo2DecimalPlaces(this.answer)
        }               
        
 
      }

      return this.answer;

    },
    placeProblem(row) {
      let randomIndex;
      // Helper functions:
      const isTheRowClear = (pane0, pane1, pane2, pane3) => {
        return this.panesArray[pane0]==="" && this.panesArray[pane1]==="" && this.panesArray[pane2]===""&& this.panesArray[pane3]==="";
      }
      const clearPreviousRow = (pane0, pane1, pane2, pane3) => {
        this.panesArray[pane0]="";
        this.panesArray[pane1]="";
        this.panesArray[pane2]="";
        this.panesArray[pane3]="";
      }

      if (row === 0 && isTheRowClear(0,1,2,3)) {
        randomIndex = Math.floor(Math.random()*4);
        this.panesArray[randomIndex] = this.problem; 
      }
      else if (row === 1 && isTheRowClear(4,5,6,7)) {
        clearPreviousRow(0,1,2,3)
        randomIndex = Math.floor(Math.random()*4)+4;
        this.panesArray[randomIndex] = this.problem; 
      }
      else if (row === 2 && isTheRowClear(8,9,10,11)) {
        clearPreviousRow(4,5,6,7);
        randomIndex = Math.floor(Math.random()*4)+8;
        this.panesArray[randomIndex] = this.problem; 
      }
    },
    placeAnswers(answer) {
      this.answer = answer;
      const arrayToFill = [...this.answersArray];
      const answers = [answer, answer + 1, Math.floor(answer / 2), Math.floor(answer * 2)];
      while(answers.length > 0) {
        const randomIndex = Math.floor(Math.random()*4);
        if (this.answersArray[randomIndex] === "") {
          this.answersArray[randomIndex] = answers.pop();
        }
      }
    },
    checkAnswer(answer) {
      if (answer === this.answer) {
        this.points++;
        this.reset();
        console.log(this.points);
      }
      else {
        this.points--;
        console.log("wrong");
      }
    },
    reset() {
      this.answersArray = ["","","",""];
      this.panesArray = [
        "", "" , "" , "",
        "", "" , "" , "",
        "", "" , "" , "",
      ];
      this.elapsedTime = 0;
      this.answersArePlaced = false;
      this.timeCreated = Date.now();
    },
    update() {
      if(!this.answersArePlaced) {
        this.placeAnswers(this.makeProblem());
        this.answersArePlaced = true;
        var intervalID = setInterval(this.update, 500);
      }      
      if (this.elapsedTime < 3000) {
        this.placeProblem(0)
      }
      else if (this.elapsedTime < 6000) {
        this.placeProblem(1)
      }
      else if (this.elapsedTime < 9000) {
        this.placeProblem(2)
      }
      else {
        clearInterval(intervalID);
        this.reset();
        this.update();
      }
      this.elapsedTime = Date.now() - this.timeCreated;
    }
  },

  created() {
    this.update()
  },


}).mount('#grid-container')