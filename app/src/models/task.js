export default class Task {
    constructor(name, matter, teacher, description, date, hour) {
        this.name = name;
        this.matter = matter;
        this.teacher = teacher;
        this.description = description;
        this.date = date;
        this.hour = hour;
    }

    setName(name) {
        this.name = name;
    }

    setMatter(matter) {
        this.matter = matter;
    }

    setTeacher(teacher) {
        this.teacher = teacher;
    }

    setDescription(description) {
        this.description = description;
    }

    setDate(date) {
        this.date = date;
    }

    setHour(hour) {
        this.hour = hour;
    }
}