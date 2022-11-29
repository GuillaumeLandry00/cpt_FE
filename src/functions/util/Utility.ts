export class Utility {

    public static getCurrentDate(): string {
        return new Date().toISOString().substring(0, 10);
    }

    public static calcToPay(net: string, paid: string) {
        let netFloat: number = parseFloat(net.toLocaleString().replace(" ", ''));
        let paidFloat: number = parseFloat(paid.toLocaleString().replace(" ", ''))
        return Math.round(((netFloat - paidFloat) + Number.EPSILON) * 100) / 100
    }

    public static roundNumber(int: number) {
        return Math.round((int + Number.EPSILON) * 100) / 100
    }

    public static isJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    public static calcComm(type: string, comm: number, total: number): number {

        let amount = 0;

        if (type == "%") {
            amount = (comm / 100) * total;
        } else if (type == "net") {
            amount = total + comm;
        } else {
            amount = total + comm;
        }

        return this.roundNumber(amount);
    }
}