//% weight=100 color=#ff8000 icon="\uf11b"
//% block="Cpe Controller"
namespace Cpe {

    // ฟังก์ชันช่วยแปลงค่าจากช่วงหนึ่งไปยังอีกช่วง
    //% blockId="cpe_map_value" block="map %value from %fromLow to %fromHigh scale to %toLow to %toHigh"
    //% inlineInputMode=inline
    export function mapValue(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return toLow + (toHigh - toLow) * ((value - fromLow) / (fromHigh - fromLow));
    }

    // ฟังก์ชันควบคุมมอเตอร์
    //% blockId="cpe_motor" block="motor %motor speed %speed"
    //% speed.min=0 speed.max=100
    //% inlineInputMode=inline
    export function Motor(motor: "Forward" | "Backward", speed: number): void {
        const motorspeed = mapValue(speed, 0, 100, 0, 1023);
        if (motor === "Forward") {
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.analogWritePin(AnalogPin.P14, motorspeed);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        } else {
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.analogWritePin(AnalogPin.P14, motorspeed);
            pins.digitalWritePin(DigitalPin.P15, 1);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        }
    }

    // ฟังก์ชันควบคุมการหมุน
    //% blockId="cpe_turn" block="turn %direction speed %speed"
    //% speed.min=0 speed.max=100
    //% inlineInputMode=inline
    export function Turn(direction: "Left" | "Right", speed: number): void {
        const motorspeed = mapValue(speed, 0, 100, 0, 1023);
        if (direction === "Left") {
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.analogWritePin(AnalogPin.P14, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, motorspeed);
        } else {
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
    //% blockId="cpe_servo" block="set servo %servo angle %degree range %range"
    //% degree.min=0 degree.max=180
    //% range.defl="0-180"
    //% inlineInputMode=inline
    export function Servo(servo: "SV1" | "SV2", degree: number, range: "0-90" | "0-180"): void {
        let pin: AnalogPin = servo === "SV1" ? AnalogPin.P8 : AnalogPin.P12;
        let mappedDegree = Math.max(0, Math.min(range === "0-90" ? 90 : 180, degree));
        pins.servoWritePin(pin, mappedDegree);
    }
}
