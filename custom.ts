//% weight=100 color=#ff8000 icon="\uf11b"
//% block="Cpe Controller"
namespace Cpe {

    //% blockId="cpe_motor" block="motor %motor | speed %speed"
    //% speed.min=0 speed.max=100
    export function Motor(motor: "Forward" | "Backward", speed: number): void {
        const motorspeed = Math.map(speed, 0, 100, 0, 1023);
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

    //% blockId="cpe_turn" block="turn %direction | speed %speed"
    //% speed.min=0 speed.max=100
    export function Turn(direction: "Left" | "Right", speed: number): void {
        const motorspeed = Math.map(speed, 0, 100, 0, 1023);
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
        let mappedDegree = degree;
        if (range === "0-90") {
            mappedDegree = Math.max(0, Math.min(90, degree)); // จำกัดช่วง 0-90 องศา
        } else if (range === "0-180") {
            mappedDegree = Math.max(0, Math.min(180, degree)); // จำกัดช่วง 0-180 องศา
        }

        // ควบคุมเซอร์โว
        pins.servoWritePin(pin, mappedDegree);
    }
}
