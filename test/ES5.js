(function () {
    'use strict'
    //函数声明
    // function Animal() {
    //    
    // }
    var Animal = function (name,age) {
      this.name = name;
      this.age = age;
      this.say = function () {
        console.log(this.name+" "+this.age);
      };
    };

    var cat = new Animal('小猫',3);
    cat.say();

})();