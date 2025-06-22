//--------------------- Copyright Block ----------------------
/*
PrayTimes.js: Prayer Times Calculator (ver 2.3)
Copyright (C) 2007-2011 PrayTimes.org

Developer: Hamid Zarrabi-Zadeh
License: GNU LGPL v3.0

TERMS OF USE:
	Permission is granted to use this code, with or
	without modification, in any website or application
	provided that credit is given to the original work
	with a link back to PrayTimes.org.

This program is distributed in the hope that it will
be useful, but WITHOUT ANY WARRANTY.

PLEASE DO NOT REMOVE THIS COPYRIGHT BLOCK.

*/

//--------------------- Help and Manual ----------------------
/*

User's Manual:
http://praytimes.org/manual

Calculation Formulas:
http://praytimes.org/calculation

//------------------------ User Interface -------------------------


	getTimes (date, coordinates [, timeZone [, dst [, timeFormat]]])

	setMethod (method)       // set calculation method
	adjust (parameters)      // adjust calculation parameters
	tune (offsets)           // tune times by given offsets

	getMethod ()             // get calculation method
	getSetting ()            // get current calculation parameters
	getOffsets ()            // get current time offsets


//------------------------- Sample Usage --------------------------


	import PrayTimes from './PrayTimes'; // Assuming the file is named PrayTimes.ts or .js

	const PT = new PrayTimes('ISNA');
	const times = PT.getTimes(new Date(), [43, -80], -5);
	console.log('Sunrise = '+ times.sunrise)


*/

//---------------------- Interfaces and Types ----------------------

interface PrayerTimesResult {
  imsak: string | number;
  fajr: string | number;
  sunrise: string | number;
  dhuhr: string | number;
  asr: string | number;
  sunset: string | number;
  maghrib: string | number;
  isha: string | number;
  midnight: string | number;
}

interface PrayerTimesFloatResult {
  imsak: number;
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  sunset: number;
  maghrib: number;
  isha: number;
  midnight: number;
}

// Define a type for parameters that can be numbers or specific strings
type AngleOrMinutes = number | string; // Using a type alias for clarity

interface CalculationParameters {
  imsak?: AngleOrMinutes;
  fajr: AngleOrMinutes;
  sunrise?: AngleOrMinutes;
  dhuhr?: AngleOrMinutes;
  asr: 'Standard' | 'Hanafi' | number;
  sunset?: AngleOrMinutes;
  maghrib: AngleOrMinutes;
  isha: AngleOrMinutes;
  midnight: 'Standard' | 'Jafari';
  highLats?: 'NightMiddle' | 'AngleBased' | 'OneSeventh' | 'None';
}

interface CalculationMethod {
  name: string;
  params: CalculationParameters;
}

interface CalculationMethods {
  [key: string]: CalculationMethod;
}

interface TimeOffsets {
  imsak?: number;
  fajr?: number;
  sunrise?: number;
  dhuhr?: number;
  asr?: number;
  sunset?: number;
  maghrib?: number;
  isha?: number;
  midnight?: number;
}

type TimeFormat = '24h' | '12h' | '12hNS' | 'Float';

//---------------------- Degree-Based Math Class -----------------------

class DMath {
  static dtr(d: number): number {
    return (d * Math.PI) / 180.0;
  }

  static rtd(r: number): number {
    return (r * 180.0) / Math.PI;
  }

  static sin(d: number): number {
    return Math.sin(this.dtr(d));
  }

  static cos(d: number): number {
    return Math.cos(this.dtr(d));
  }

  static tan(d: number): number {
    return Math.tan(this.dtr(d));
  }

  static arcsin(d: number): number {
    return this.rtd(Math.asin(d));
  }

  static arccos(d: number): number {
    return this.rtd(Math.acos(d));
  }

  static arctan(d: number): number {
    return this.rtd(Math.atan(d));
  }

  static arccot(x: number): number {
    return this.rtd(Math.atan(1 / x));
  }

  static arctan2(y: number, x: number): number {
    return this.rtd(Math.atan2(y, x));
  }

  static fixAngle(a: number): number {
    return this.fix(a, 360);
  }

  static fixHour(a: number): number {
    return this.fix(a, 24);
  }

  static fix(a: number, b: number): number {
    a = a - b * Math.floor(a / b);
    return a < 0 ? a + b : a;
  }
}

//----------------------- PrayTimes Class ------------------------

export default class PrayTimes {
  //------------------------ Constants --------------------------
  private timeNames = {
    imsak: 'Imsak',
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    sunset: 'Sunset',
    maghrib: 'Maghrib',
    isha: 'Isha',
    midnight: 'Midnight',
  };

  // Calculation Methods
  private methods: CalculationMethods = {
    MWL: {
      name: 'Muslim World League',
      params: {
        fajr: 18,
        isha: 17,
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    },
    ISNA: {
      name: 'Islamic Society of North America (ISNA)',
      params: {
        fajr: 15,
        isha: 15,
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    },
    Egypt: {
      name: 'Egyptian General Authority of Survey',
      params: {
        fajr: 19.5,
        isha: 17.5,
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    },
    Makkah: {
      name: 'Umm Al-Qura University, Makkah',
      params: {
        fajr: 18.5,
        isha: '90 min',
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    }, // fajr was 19 degrees before 1430 hijri
    Karachi: {
      name: 'University of Islamic Sciences, Karachi',
      params: {
        fajr: 18,
        isha: 18,
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    },
    Tehran: {
      name: 'Institute of Geophysics, University of Tehran',
      params: {
        fajr: 17.7,
        isha: 14,
        maghrib: 4.5,
        midnight: 'Jafari',
        asr: 'Standard',
      },
    }, // isha is not explicitly specified in this method
    Jafari: {
      name: 'Shia Ithna-Ashari, Leva Institute, Qum',
      params: {
        fajr: 16,
        isha: 14,
        maghrib: 4,
        midnight: 'Jafari',
        asr: 'Standard',
      },
    },
    Turkiye: {
      name: 'Turkiye',
      params: {
        fajr: 18,
        isha: 17,
        maghrib: '0 min',
        midnight: 'Standard',
        asr: 'Standard',
      },
    },
  };

  // Default Parameters in Calculation Methods
  private defaultParams: CalculationParameters = {
    maghrib: '0 min',
    midnight: 'Standard',
    asr: 'Standard',
    fajr: 18,
    isha: 17,
    imsak: '10 min',
    dhuhr: '0 min',
    highLats: 'NightMiddle',
  };

  private calcMethod: keyof CalculationMethods = 'MWL';
  private setting: CalculationParameters;
  private timeFormat: TimeFormat = '24h';
  private timeSuffixes: [string, string] = ['am', 'pm'];
  private invalidTime = '-----';
  private numIterations = 1;
  private offset: TimeOffsets = {};

  //----------------------- Local Variables ---------------------
  private lat: number = 0;
  private lng: number = 0;
  private elv: number = 0; // elevation in meters
  private timeZone: number = 0;
  private jDate: number = 0; // Julian date

  //---------------------- Initialization -----------------------

  constructor(method: keyof CalculationMethods = 'MWL') {
    // Ensure default parameters are present in all methods
    for (const methodKey in this.methods) {
      const params = this.methods[methodKey].params;
      for (const defaultKey in this.defaultParams) {
        const key = defaultKey as keyof CalculationParameters;
        // Use Object.prototype.hasOwnProperty.call for safer property check
        if (Object.prototype.hasOwnProperty.call(this.defaultParams, key)) {
          // If the method doesn't have this parameter defined, use the default
          if (typeof params[key] === 'undefined') {
            // Directly assign the default value. With the refined
            // CalculationParameters type, this assignment is now valid
            // as the properties can be number or string.
            params[key] = this.defaultParams[key] as never; // Still keeping never here for broader compatibility if method params were stricter
          }
        }
      }
    }

    // Initialize settings by merging defaults and method parameters
    this.calcMethod = this.methods[method] ? method : 'MWL';
    // Use Object.assign or spread syntax for merging
    this.setting = {
      ...this.defaultParams,
      ...this.methods[this.calcMethod].params,
    };

    // Init time offsets
    for (const timeName in this.timeNames) {
      this.offset[timeName as keyof TimeOffsets] = 0;
    }
  }

  //----------------------- Public Functions ------------------------

  /**
   * Sets the prayer calculation method.
   * @param method The name of the calculation method (e.g., 'MWL', 'ISNA').
   */
  setMethod(method: keyof CalculationMethods): void {
    if (this.methods[method]) {
      this.adjust(this.methods[method].params);
      this.calcMethod = method;
    } else {
      console.warn(`Method "${method}" not found. Using default method.`);
    }
  }

  /**
   * Adjusts calculation parameters.
   * @param params An object with parameters to adjust (e.g., { fajr: 18, isha: 17 }).
   */
  adjust(params: Partial<CalculationParameters>): void {
    this.setting = { ...this.setting, ...params };
  }

  /**
   * Tunes the prayer times by adding or subtracting minutes.
   * @param timeOffsets An object with time names and their offsets in minutes (e.g., { fajr: 5, sunrise: -2 }).
   */
  tune(timeOffsets: TimeOffsets): void {
    for (const timeName in timeOffsets) {
      if (this.offset.hasOwnProperty(timeName)) {
        this.offset[timeName as keyof TimeOffsets] =
          timeOffsets[timeName as keyof TimeOffsets];
      }
    }
  }

  /**
   * Gets the current calculation method.
   * @returns The name of the current calculation method.
   */
  getMethod(): keyof CalculationMethods {
    return this.calcMethod;
  }

  /**
   * Gets the current calculation settings.
   * @returns An object containing the current calculation parameters.
   */
  getSetting(): CalculationParameters {
    return { ...this.setting };
  }

  /**
   * Gets the current time offsets.
   * @returns An object containing the current time offsets in minutes.
   */
  getOffsets(): TimeOffsets {
    return { ...this.offset };
  }

  /**
   * Gets the default calculation parameters for all methods.
   * @returns An object containing all available calculation methods and their default parameters.
   */
  getDefaults(): CalculationMethods {
    return { ...this.methods };
  }

  /**
   * Calculates prayer times for a given date and location.
   * @param date The date for which to calculate times (either a Date object or a [year, month, day] array).
   * @param coords The coordinates as a [latitude, longitude, elevation] array.
   * @param timezone The time zone offset from GMT (e.g., -5 for EST). If 'auto', it will attempt to detect the time zone.
   * @param dst Daylight Saving Time offset (0 or 1). If 'auto', it will attempt to detect DST.
   * @param format The format for the returned times ('24h', '12h', '12hNS', 'Float'). Defaults to '24h'.
   * @returns An object containing the prayer times.
   */
  getTimes(
    date: Date | [number, number, number],
    coords: [number, number, number?],
    timezone: number | 'auto' = 'auto',
    dst: number | 'auto' = 'auto',
    format: TimeFormat = '24h'
  ): PrayerTimesResult {
    this.lat = 1 * coords[0];
    this.lng = 1 * coords[1];
    this.elv = coords[2] ? 1 * coords[2] : 0;
    this.timeFormat = format;

    let dateArray: [number, number, number];
    if (date instanceof Date) {
      dateArray = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    } else {
      dateArray = date;
    }

    let calculatedTimeZone: number;
    if (timezone === 'auto') {
      calculatedTimeZone = this.getTimeZone(dateArray);
    } else {
      calculatedTimeZone = timezone;
    }

    let calculatedDst: number;
    if (dst === 'auto') {
      calculatedDst = this.getDst(dateArray);
    } else {
      calculatedDst = dst;
    }

    // Error 2 & 3 Fix: Ensure calculatedTimeZone and calculatedDst are numbers before arithmetic
    this.timeZone = calculatedTimeZone + (calculatedDst ? 1 : 0);
    this.jDate =
      this.julian(dateArray[0], dateArray[1], dateArray[2]) -
      this.lng / (15 * 24);

    return this.computeTimes();
  }

  /**
   * Converts a floating point time to the specified format.
   * @param time The time as a floating point number (e.g., 13.5 for 13:30).
   * @param format The desired time format ('24h', '12h', '12hNS', 'Float').
   * @param suffixes Custom suffixes for 12-hour format (e.g., ['am', 'pm']). Defaults to ['am', 'pm'].
   * @returns The formatted time string or floating point number.
   */
  getFormattedTime(
    time: number,
    format: TimeFormat,
    suffixes?: [string, string]
  ): string | number {
    if (isNaN(time)) {
      return this.invalidTime;
    }
    if (format === 'Float') {
      return time;
    }

    // Error 4 & 5 Fix: Explicitly handle the case where suffixes is undefined
    const currentSuffixes: [string, string] = suffixes || this.timeSuffixes;

    time = DMath.fixHour(time + 0.5 / 60); // add 0.5 minutes to round
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    const suffix = format === '12h' ? currentSuffixes[hours < 12 ? 0 : 1] : '';
    const hour =
      format === '24h'
        ? this.twoDigitsFormat(hours)
        : ((hours + 12 - 1) % 12) + 1;

    return `${hour}:${this.twoDigitsFormat(minutes)}${
      suffix ? ' ' + suffix : ''
    }`;
  }

  //---------------------- Calculation Functions -----------------------

  // compute mid-day time
  private midDay(time: number): number {
    const eqt = this.sunPosition(this.jDate + time).equation;
    const noon = DMath.fixHour(12 - eqt);
    return noon;
  }

  // compute the time at which sun reaches a specific angle below horizon
  private sunAngleTime(
    angle: number,
    time: number,
    direction?: 'ccw' | 'cw'
  ): number {
    const decl = this.sunPosition(this.jDate + time).declination;
    const noon = this.midDay(time);
    const t =
      (1 / 15) *
      DMath.arccos(
        (-DMath.sin(angle) - DMath.sin(decl) * DMath.sin(this.lat)) /
          (DMath.cos(decl) * DMath.cos(this.lat))
      );
    return noon + (direction === 'ccw' ? -t : t);
  }

  // compute asr time
  private asrTime(factor: number, time: number): number {
    const decl = this.sunPosition(this.jDate + time).declination;
    const angle = -DMath.arccot(factor + DMath.tan(Math.abs(this.lat - decl)));
    return this.sunAngleTime(angle, time);
  }

  // compute declination angle of sun and equation of time
  // Ref: http://aa.usno.navy.mil/faq/docs/SunApprox.php
  private sunPosition(jd: number): { declination: number; equation: number } {
    const D = jd - 2451545.0;
    const g = DMath.fixAngle(357.529 + 0.98560028 * D);
    const q = DMath.fixAngle(280.459 + 0.98564736 * D);
    const L = DMath.fixAngle(
      q + 1.915 * DMath.sin(g) + 0.02 * DMath.sin(2 * g)
    );

    // const R = 1.00014 - 0.01671 * DMath.cos(g) - 0.00014 * DMath.cos(2 * g); // not used in the original calculation
    const e = 23.439 - 0.00000036 * D;

    const RA = DMath.arctan2(DMath.cos(e) * DMath.sin(L), DMath.cos(L)) / 15;
    const eqt = q / 15 - DMath.fixHour(RA);
    const decl = DMath.arcsin(DMath.sin(e) * DMath.sin(L));

    return { declination: decl, equation: eqt };
  }

  // convert Gregorian date to Julian day
  // Ref: Astronomical Algorithms by Jean Meeus
  private julian(year: number, month: number, day: number): number {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    const JD =
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      B -
      1524.5;
    return JD;
  }

  //---------------------- Compute Prayer Times -----------------------

  // compute prayer times at given julian date
  private computePrayerTimes(
    times: PrayerTimesFloatResult
  ): PrayerTimesFloatResult {
    const dayPortions = this.dayPortion(times);
    const params = this.setting;

    const imsak = this.sunAngleTime(
      this.eval(params.imsak as number | string),
      dayPortions.imsak,
      'ccw'
    );
    const fajr = this.sunAngleTime(
      this.eval(params.fajr),
      dayPortions.fajr,
      'ccw'
    );
    const sunrise = this.sunAngleTime(
      this.riseSetAngle(),
      dayPortions.sunrise,
      'ccw'
    );
    const dhuhr = this.midDay(dayPortions.dhuhr);
    const asrFactor = this.asrFactor(params.asr);
    const asr =
      asrFactor !== undefined ? this.asrTime(asrFactor, dayPortions.asr) : NaN; // Handle potentially undefined factor
    const sunset = this.sunAngleTime(this.riseSetAngle(), dayPortions.sunset);
    const maghrib = this.sunAngleTime(
      this.eval(params.maghrib),
      dayPortions.maghrib
    );
    const isha = this.sunAngleTime(this.eval(params.isha), dayPortions.isha);

    return {
      imsak: imsak,
      fajr: fajr,
      sunrise: sunrise,
      dhuhr: dhuhr,
      asr: asr,
      sunset: sunset,
      maghrib: maghrib,
      isha: isha,
      midnight: NaN, // Midnight is calculated later
    };
  }

  // compute prayer times
  private computeTimes(): PrayerTimesResult {
    // default times
    let times: PrayerTimesFloatResult = {
      imsak: 5,
      fajr: 5,
      sunrise: 6,
      dhuhr: 12,
      asr: 13,
      sunset: 18,
      maghrib: 18,
      isha: 18,
      midnight: 0, // Placeholder, will be calculated
    };

    // main iterations
    for (let i = 1; i <= this.numIterations; i++) {
      times = this.computePrayerTimes(times);
    }

    times = this.adjustTimes(times);

    // add midnight time
    times.midnight =
      this.setting.midnight === 'Jafari'
        ? times.sunset + this.timeDiff(times.sunset, times.fajr) / 2
        : times.sunset + this.timeDiff(times.sunset, times.sunrise) / 2;

    times = this.tuneTimes(times);
    return this.modifyFormats(times);
  }

  // adjust times
  private adjustTimes(times: PrayerTimesFloatResult): PrayerTimesFloatResult {
    const params = this.setting;
    const adjustedTimes = { ...times }; // Create a copy to avoid modifying the original object

    for (const timeName in adjustedTimes) {
      const key = timeName as keyof PrayerTimesFloatResult;
      adjustedTimes[key] += this.timeZone - this.lng / 15;
    }

    if (params.highLats !== 'None') {
      this.adjustHighLats(adjustedTimes);
    }

    if (this.isMin(params.imsak as number | string)) {
      adjustedTimes.imsak =
        adjustedTimes.fajr - this.eval(params.imsak as number | string) / 60;
    }
    if (this.isMin(params.maghrib)) {
      adjustedTimes.maghrib =
        adjustedTimes.sunset + this.eval(params.maghrib) / 60;
    }
    if (this.isMin(params.isha)) {
      adjustedTimes.isha = adjustedTimes.maghrib + this.eval(params.isha) / 60;
    }
    adjustedTimes.dhuhr += this.eval(params.dhuhr as number | string) / 60;

    return adjustedTimes;
  }

  // get asr shadow factor
  private asrFactor(
    asrParam: CalculationParameters['asr']
  ): number | undefined {
    if (asrParam === 'Standard') return 1;
    if (asrParam === 'Hanafi') return 2;
    return this.eval(asrParam);
  }

  // return sun angle for sunset/sunrise
  private riseSetAngle(): number {
    // var earthRad = 6371009; // in meters
    // var angle = DMath.arccos(earthRad/(earthRad+ elv));
    // Using an approximation for elevation
    const angle = 0.0347 * Math.sqrt(this.elv);
    return 0.833 + angle;
  }

  // apply offsets to the times
  private tuneTimes(times: PrayerTimesFloatResult): PrayerTimesFloatResult {
    const tunedTimes = { ...times };
    for (const timeName in tunedTimes) {
      const key = timeName as keyof PrayerTimesFloatResult;
      if (this.offset.hasOwnProperty(key)) {
        tunedTimes[key] += (this.offset[key as keyof TimeOffsets] || 0) / 60;
      }
    }
    return tunedTimes;
  }

  // convert times to given time format
  private modifyFormats(times: PrayerTimesFloatResult): PrayerTimesResult {
    const formattedTimes: Partial<PrayerTimesResult> = {};
    for (const timeName in times) {
      const key = timeName as keyof PrayerTimesFloatResult;
      formattedTimes[key] = this.getFormattedTime(times[key], this.timeFormat);
    }
    return formattedTimes as PrayerTimesResult;
  }

  // adjust times for locations in higher latitudes
  private adjustHighLats(
    times: PrayerTimesFloatResult
  ): PrayerTimesFloatResult {
    const params = this.setting;
    const nightTime = this.timeDiff(times.sunset, times.sunrise);
    const adjustedTimes = { ...times };

    // Ensure imsak, fajr, isha, maghrib parameters are treated as number | string for eval
    const imsakParam = params.imsak as AngleOrMinutes;
    const fajrParam = params.fajr as AngleOrMinutes;
    const ishaParam = params.isha as AngleOrMinutes;
    const maghribParam = params.maghrib as AngleOrMinutes;

    adjustedTimes.imsak = this.adjustHLTime(
      adjustedTimes.imsak,
      adjustedTimes.sunrise,
      this.eval(imsakParam),
      nightTime,
      'ccw'
    );
    adjustedTimes.fajr = this.adjustHLTime(
      adjustedTimes.fajr,
      adjustedTimes.sunrise,
      this.eval(fajrParam),
      nightTime,
      'ccw'
    );
    adjustedTimes.isha = this.adjustHLTime(
      adjustedTimes.isha,
      adjustedTimes.sunset,
      this.eval(ishaParam),
      nightTime
    );
    adjustedTimes.maghrib = this.adjustHLTime(
      adjustedTimes.maghrib,
      adjustedTimes.sunset,
      this.eval(maghribParam),
      nightTime
    );

    return adjustedTimes;
  }

  // adjust a time for higher latitudes
  private adjustHLTime(
    time: number,
    base: number,
    angle: number,
    night: number,
    direction?: 'ccw' | 'cw'
  ): number {
    const portion = this.nightPortion(angle, night);
    const timeDiff =
      direction === 'ccw'
        ? this.timeDiff(time, base)
        : this.timeDiff(base, time);

    // Check for NaN and if the time difference is too large
    if (isNaN(time) || timeDiff > portion) {
      return base + (direction === 'ccw' ? -portion : portion);
    }

    return time;
  }

  // the night portion used for adjusting times in higher latitudes
  private nightPortion(angle: number, night: number): number {
    const method = this.setting.highLats;
    let portion = 1 / 2; // MidNight
    if (method === 'AngleBased') portion = (1 / 60) * angle;
    if (method === 'OneSeventh') portion = 1 / 7;
    return portion * night;
  }

  // convert hours to day portions
  private dayPortion(times: PrayerTimesFloatResult): PrayerTimesFloatResult {
    const dayPortions: Partial<PrayerTimesFloatResult> = {};
    for (const timeName in times) {
      const key = timeName as keyof PrayerTimesFloatResult;
      dayPortions[key] = times[key] / 24;
    }
    return dayPortions as PrayerTimesFloatResult;
  }

  //---------------------- Time Zone Functions -----------------------

  // get local time zone
  private getTimeZone(date: [number, number, number]): number {
    const year = date[0];
    // Get GMT offset at the beginning and middle of the year
    const t1 = this.gmtOffset([year, 1, 1]); // Jan 1st
    const t2 = this.gmtOffset([year, 7, 1]); // July 1st
    // The standard time zone is the minimum of the two (handles DST)
    return Math.min(t1, t2);
  }

  // get daylight saving for a given date
  private getDst(date: [number, number, number]): number {
    // DST is active if the GMT offset for the specific date is different from the standard time zone
    return this.gmtOffset(date) !== this.getTimeZone(date) ? 1 : 0;
  }

  // GMT offset for a given date using JavaScript's Date object
  private gmtOffset(date: [number, number, number]): number {
    // Create a date object at noon to avoid issues with time changes
    const localDate = new Date(date[0], date[1] - 1, date[2], 12, 0, 0, 0);
    // Get the date in GMT string format
    const GMTString = localDate.toUTCString();
    // Parse the GMT string back into a Date object
    // Ensure a valid date string is parsed
    const GMTDate = new Date(GMTString);

    // Check if the parsed date is valid before calculating difference
    if (isNaN(GMTDate.getTime())) {
      console.error('Failed to parse GMT date string:', GMTString);
      return 0; // Return a default value or handle error appropriately
    }

    // Calculate the difference in hours between local time and GMT
    const hoursDiff =
      (localDate.getTime() - GMTDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff;
  }

  //---------------------- Misc Functions -----------------------

  // convert given string into a number
  private eval(str: number | string): number {
    // Error 6 Fix: Ensure the result of split is a string before converting to number
    const parts = (str + '').split(/[^0-9.+-]/);
    const numericPart = parts[0];
    return 1 * parseFloat(numericPart); // Use parseFloat for robust conversion
  }

  // detect if input contains 'min'
  private isMin(arg: number | string): boolean {
    return (arg + '').indexOf('min') !== -1;
  }

  // compute the difference between two times (handling midnight wrap-around)
  private timeDiff(time1: number, time2: number): number {
    return DMath.fixHour(time2 - time1);
  }

  // add a leading 0 if necessary
  private twoDigitsFormat(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}

//---------------------- Init Object -----------------------

// let prayTimes = new PrayTimes('Turkiye');
