class SchedulerFormatter{
    numerizeHour(hour){
        // '08:40' returns 0, '12:30' returns 4
        return Number(hour.split(":")[0]) - 8;
    }

    getClassSpan(start, end){
        var nums = [];
        if(start > 4){
            start -= 1;
            end -=1;
        }
        for(var i = start; i < end; i++){
            nums.push(i)
        }

        // 08:40, 10:30 would return, after stopping at numerizeHour(), [0, 1]
        return nums;
    }

    numerizeDay(day){
        if(day === 'Mon'){
            return 0;
        }
        else if(day === 'Tue'){
            return 1;
        }
        else if(day === 'Wed'){
            return 2;
        }
        else if(day === 'Thu'){
            return 3;
        }
        else if(day === 'Fri'){
            return 4;
        }
        else{
            return 5;
        }
    }

    tokenizeLecture(lecture){
        var day = lecture.day;
        var start = lecture.hours[0];
        var end = lecture.hours[1];
        var location = lecture.location;
        var status = lecture.status;

        var dayNum = this.numerizeDay(day);
        var classSpan = this.getClassSpan(this.numerizeHour(start), this.numerizeHour(end));

        return {day, start, end, location, status, dayNum, classSpan};
    }

    formatSchedule(classes, isClassroom, location) {
        var schedule = [
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}]
        ];

        for (var i = 0; i < classes.length; i++) {
            var lectures = classes[i].lectures;
            for (var j = 0; lectures != undefined && j < lectures.length; j++){
                var tokenizedLecture = this.tokenizeLecture(lectures[j]);
                var obj = {
                    "departmentCode": classes[i].departmentCode,
                    "courseCode": classes[i].courseCode,
                    "section": classes[i].section,
                    "status": tokenizedLecture.status,
                    "location": tokenizedLecture.location,
                    "className": "bg-col" + (i+1)
                };

                var day = tokenizedLecture.dayNum;
                var hours = tokenizedLecture.classSpan;

                for(var k = 0; k < hours.length; k++){
                    let existingClass = schedule[day][hours[k]];

                    // Meaning that (simply) the current hour is not empty.
                    if(existingClass != undefined && Object.getOwnPropertyNames(existingClass) > 0){
                        if(existingClass.status != "[L]"){
                            // If the current hour has a regular class, leave it be.
                        }
                        // Otherwise, replace it with a regular class.
                        else{
                            if(isClassroom && obj.location == location){
                                schedule[day][hours[k]] = obj;
                            }
                            else if(!isClassroom){
                                schedule[day][hours[k]] = obj;
                            }
                        }
                    }
                    else{
                        if(isClassroom && obj.location == location){
                            schedule[day][hours[k]] = obj;
                        }
                        else if(!isClassroom){
                            schedule[day][hours[k]] = obj;
                        }
                    }
                }
            }
        }

        return schedule;
    }

    prettifyCourse(schedule) {
        return schedule.departmentCode + schedule.courseCode + "-" + schedule.section;
    }
}

export default new SchedulerFormatter();