var Kamil = /** @class */ (function () {
    function Kamil(msg) {
        this.imie = 'jestem kamil!';
        this.imie = msg + this.imie;
    }
    Kamil.przedstawStatycznie = function () {
        console.log(Kamil.imie2 + '\n');
    };
    Kamil.prototype.przedstawSie = function () {
        console.log(this.imie + '\n');
    };
    Kamil.imie2 = 'jestem kamil!';
    return Kamil;
}());
Kamil.przedstawStatycznie();
var kamilObj = new Kamil('witam!');
kamilObj.przedstawSie();
