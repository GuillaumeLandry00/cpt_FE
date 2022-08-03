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
}