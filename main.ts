function stop_big_motor () {
    pins.digitalWritePin(DigitalPin.P5, 0)
    pins.digitalWritePin(DigitalPin.P4, 0)
    big_motor_2_bit_counter = 0
}
function forward_s_motor () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.RedBrake, PfAction.Pressed, function () {
    stop_s_motor()
})
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.BlueIncrement, PfAction.Pressed, function () {
    if (!(big_motor_2_bit_counter == 2)) {
        big_motor_2_bit_counter += 1
    }
    if (big_motor_2_bit_counter == 2) {
        forward_big_motor()
    }
    if (big_motor_2_bit_counter == 0 || big_motor_2_bit_counter == 1) {
        stop_big_motor()
    }
})
function forward_big_motor () {
    pins.digitalWritePin(DigitalPin.P5, 1)
    pins.digitalWritePin(DigitalPin.P4, 0)
}
function stop_s_motor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    big_motor_2_bit_counter = 0
}
function backwards_s_motor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 1)
}
function backwards_big_motor () {
    pins.digitalWritePin(DigitalPin.P3, 0)
    pins.digitalWritePin(DigitalPin.P4, 1)
}
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.BlueBrake, PfAction.Pressed, function () {
    stop_big_motor()
})
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.RedDecrement, PfAction.Pressed, function () {
    forward_s_motor()
    basic.pause(30)
    stop_s_motor()
})
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.RedIncrement, PfAction.Pressed, function () {
    backwards_s_motor()
    basic.pause(30)
    stop_s_motor()
})
pfReceiver.onSpeedRCcommand(PfReceiverChannel.Channel1, PfSpeedControl.BlueDecrement, PfAction.Pressed, function () {
    if (!(big_motor_2_bit_counter == -1)) {
        big_motor_2_bit_counter += -1
    }
    if (big_motor_2_bit_counter == -1) {
        backwards_big_motor()
    }
    if (big_motor_2_bit_counter == 0 || big_motor_2_bit_counter == 1) {
        stop_big_motor()
    }
})
let big_motor_2_bit_counter = 0
pfReceiver.connectIrReceiver(DigitalPin.P0)
led.enable(false)
stop_big_motor()
stop_s_motor()
