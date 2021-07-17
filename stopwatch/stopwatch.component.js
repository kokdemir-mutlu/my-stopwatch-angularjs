angular.module("stopwatch").component("stopwatchComponent", {
  templateUrl: "stopwatch/stopwatch.template.html",
  controller: function StopwatchController($interval) {
    var stopWatch = this;
    stopWatch.laps = [];
    stopWatch.startButton = "START";
    stopWatch.resetButton = "RESET";
    stopWatch.intervalId;
    stopWatch.isRunning = false;
    stopWatch.milisec = 0;
    stopWatch.sec = 0;
    stopWatch.min = 0;
    stopWatch.hour = 0;
    stopWatch.counterForLaps = 1;
    stopWatch.counterP = "00:00:00:00";
    var promise;

    stopWatch.handleStartButton = function () {
      
      $interval.cancel(promise);

      if (!stopWatch.isRunning) {
        stopWatch.isRunning = true;
        stopWatch.startButton = "STOP";
        stopWatch.resetButton = "LAP";
        promise = $interval(updateTheStopWatch, 10);
      } else {
        $interval.cancel(promise);
        stopWatch.startButton = "START";
        stopWatch.isRunning = false;
        stopWatch.resetButton = "RESET";
      }
    };

    stopWatch.handleResetButton = function () {
      if (stopWatch.isRunning) {
        addLap();
      } else {
        $interval.cancel(promise);
        deleteLapTable();
        resetTimeVariables();
      }
    };

    resetTimeVariables = function () {
      stopWatch.isRunning = false;
      stopWatch.milisec = 0;
      stopWatch.sec = 0;
      stopWatch.min = 0;
      stopWatch.hour = 0;
      stopWatch.counterForLaps = 1;
      stopWatch.counterP = "00:00:00:00";
    };

    deleteLapTable = function () {
      stopWatch.laps = [];
      stopWatch.counterForLaps = 1;
    };

    addLap = function () {
      stopWatch.laps.push(stopWatch.counterP);
      ++stopWatch.counterForLaps;
    };

    updateTheStopWatch = function () {
      stopWatch.milisec += 10;
      var strMilisec = "";
      var strSec = "";
      var strMin = "";
      var strHour = "";
      if (stopWatch.milisec < 100) {
        strMilisec = "0" + stopWatch.milisec / 10;
      } else {
        if (stopWatch.milisec === 1000) {
          stopWatch.sec += 1;
          stopWatch.milisec = 0;
          strMilisec = "00";
        } else {
          strMilisec = (stopWatch.milisec / 10).toString();
        }
      }

      if (stopWatch.sec < 10) {
        strSec = "0" + stopWatch.sec;
      } else {
        if (stopWatch.sec === 60) {
          stopWatch.min += 1;
          stopWatch.sec = 0;
          strSec = "00";
        } else {
          strSec = stopWatch.sec.toString();
        }
      }

      if (stopWatch.min < 10) {
        strMin = "0" + stopWatch.min;
      } else {
        if (stopWatch.min === 60) {
          stopWatch.hour += 1;
          stopWatch.min = 0;
          strMin = "00";
        } else {
          strMin = stopWatch.min.toString();
        }
      }

      if (stopWatch.hour < 10) {
        strHour = "0" + stopWatch.hour;
      } else {
        if (stopWatch.hour === 24) {
          stopWatch.handleResetButton();
        } else {
          strHour = stopWatch.hour.toString();
        }
      }

      stopWatch.counterP = strHour + ":" + strMin + ":" + strSec + ":" + strMilisec;
    };
  },
});
