package com.rescuemission.backend.DTO;

public class ManualSensorRequest {

    private Double oxygen;
    private Double co;
    private Double co2;
    private Double methane;
    private Double temperature;
    private Double humidity;

    public Double getOxygen() {
        return oxygen;
    }

    public void setOxygen(Double oxygen) {
        this.oxygen = oxygen;
    }

    public Double getCo() {
        return co;
    }

    public void setCo(Double co) {
        this.co = co;
    }

    public Double getCo2() {
        return co2;
    }

    public void setCo2(Double co2) {
        this.co2 = co2;
    }

    public Double getMethane() {
        return methane;
    }

    public void setMethane(Double methane) {
        this.methane = methane;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }
}
