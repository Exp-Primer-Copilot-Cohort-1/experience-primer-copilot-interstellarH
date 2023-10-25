function skillsMember() {
    var skills = {
        name: "John",
        age: 40,
        showName: function() {
            console.log(this.name);
        }
    };
    console.log(skills.name);
    console.log(skills.age);
    skills.showName();
}