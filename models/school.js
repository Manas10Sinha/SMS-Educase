import { pool } from "../utils/db.js";

export class School {
  constructor(name, address, latitude, longitude) {
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
  save(latitude, longitude) {
    if (latitude && longitude) {
      return pool.execute(
        `
          UPDATE schools
          SET name = ?, address = ?, latitude = ?, longitude = ?
          WHERE latitude = ? AND longitude = ?
        `,
        [
          this.name,
          this.address,
          this.latitude,
          this.longitude,
          latitude,
          longitude,
        ]
      );
    }
    return pool.execute(
      `INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
      `,
      [this.name, this.address, this.latitude, this.longitude]
    );
  }
  static findNearByLocation(lat, lng) {
    return pool.execute(
      `
        SELECT id, name, address, latitude, longitude,
          (6371 * acos(
            cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
            sin(radians(?)) * sin(radians(latitude))
          )) AS distance_km
        FROM schools
        ORDER BY distance_km ASC
      `,
      [lat, lng, lat]
    );
  }
}
