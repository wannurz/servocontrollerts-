//% weight=100 color=#ff8000 icon="\uf11b"
//% block="Cpe Controller"
namespace Cpe {

    // ฟังก์ชันช่วยแปลงค่าจากช่วงหนึ่งไปยังอีกช่วง
    //% blockId="cpe_map_value" block="map value %value | from range %fromLow-%fromHigh to %toLow-%toHigh"
    export function mapValue(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return toLow + (toHigh - toLow) * ((value - fromLow) / (fromHigh - fromLow));
    }

    // ฟังก์ชันควบคุมมอเตอร์
    //% blockId="cpe_motor" block="motor %motor | speed %speed"
    //% speed.min=0 speed.max=100
    export function Motor(motor: "Forward" | "Backward", speed: number): void {
        const motorspeed = mapValue(speed, 0, 100, 0, 1023); // ใช้ mapValue แทน Math.map
        if (motor === "Forward") {
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.analogWritePin(AnalogPin.P14, motorspeed);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        } else if (motor === "Backward") {
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.analogWritePin(AnalogPin.P14, motorspeed);
            pins.digitalWritePin(DigitalPin.P15, 1);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        }
    }

    // ฟังก์ชันควบคุมการหมุน
    //% blockId="cpe_turn" block="turn %direction | speed %speed"
    //% speed.min=0 speed.max=100
    export function Turn(direction: "Left" | "Right", speed: number): void {
        const motorspeed = mapValue(speed, 0, 100, 0, 1023); // ใช้ mapValue แทน Math.map
        if (direction === "Left") {
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.analogWritePin(AnalogPin.P14, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        } else if (direction === "Right") {
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.analogWritePin(AnalogPin.P14, motorspeed);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, 0);
        }
    }

    // ฟังก์ชันหยุดมอเตอร์
    //% blockId="cpe_motor_stop" block="stop motor"
    export function MotorStop(): void {
        pins.digitalWritePin(DigitalPin.P13, 1);
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P15, 1);
        pins.analogWritePin(AnalogPin.P16, 0);
    }

    // ฟังก์ชันควบคุมเซอร์โว
    //% blockId="cpe_servo" block="set servo %servo | angle %degree | range %range"
    //% degree.min=0 degree.max=180
    //% range.defl="0-180"
    //% expandableArgumentMode="toggle"
    export function Servo(servo: "SV1" | "SV2", degree: number, range: "0-90" | "0-180"): void {
        let pin: AnalogPin;
        if (servo === "SV1") {
            pin = AnalogPin.P8;
        } else {
            pin = AnalogPin.P12;
        }

        // จำกัดองศาตามช่วงที่กำหนด
        let mappedDegree = Math.max(0, Math.min(range === "0-90" ? 90 : 180, degree));

        // ควบคุมเซอร์โว
        pins.servoWritePin(pin, mappedDegree);
    }
}
