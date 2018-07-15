class Kamil {
    private static imie2 = 'jestem kamil!';
    private imie = 'jestem kamil!';

    public static przedstawStatycznie(): void {
        console.log(Kamil.imie2 + '\n');
    }

    public constructor(msg: string) {
        this.imie = msg + this.imie;
    }

    public przedstawSie(): void {
        console.log(this.imie + '\n');
    }
}

Kamil.przedstawStatycznie();
let kamilObj = new Kamil('witam!');
kamilObj.przedstawSie();
