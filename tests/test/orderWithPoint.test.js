const request = require("supertest");

const { createApp } = require("../../app");
const { dataSource } = require("../../api/models/dataSource");

//내가 필요한 테이블들
// 1. users
// 2.

// const amenitiesFixture = require('../fixtures/amenities-fixture');
// const themesFixture = require('../fixtures/themes-fixture');
// const regionsFixture = require('../fixtures/regions-fixture');
// const campsFixture = require('../fixtures/camps-fixture');
// const campsAmenitiesFixture = require('../fixtures/campsAmenities-fixture');
// const campsPicturesFixture = require('../fixtures/campPictures-fixture');

// const amenitiesData = require('../data/amenities-data');
// const themesData = require('../data/themes-data');
// const regionsData = require('../data/regions-data');
// const campsData = require('../data/camps-data');
// const campsAmenitiesData = require('../data/campAmenities-data');
// const campsPicturesData = require('../data/campPictures-data');

const truncate = require("../test-client");

describe("get camp detail by camp_id", () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();

    await amenitiesFixture.createAmenities(amenitiesData.testAmenity);
    await themesFixture.createThemes(themesData.testTheme);
    await regionsFixture.createRegions(regionsData.testRegion);
    await campsFixture.createCamps(campsData.testCamp);
    await campsAmenitiesFixture.createCampsAmenities(
      campsAmenitiesData.testCampAmenity
    );
    await campsPicturesFixture.createCampPictures(
      campsPicturesData.testCampPicture
    );
  });

  const tableList = [
    "amenities",
    "themes",
    "regions",
    "camps",
    "camps_amenities",
    "camp_pictures",
  ];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test("FAIL: invalid camp_id", async () => {
    const res = await request(app).get("/products/camps/5");
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: "COULD NOT PROCESS REQUEST" });
  });

  test("SUCCESS: get camp detail", async () => {
    const response = await request(app).get("/products/camps/1");
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("SUCCESS");
    expect(response.body.data).toEqual({
      campId: 1,
      campName: "campsite_name_test1",
      checkIn: "16:00",
      checkOut: "12:00",
      address: "address_test1",
      latitude: "100.1234",
      longitude: "120.4321",
      pictures: [
        "test_picture_1",
        "test_picture_2",
        "test_picture_3",
        "test_picture_4",
      ],
      price: "10000.00",
      description: "description_test1",
      thumbnail: "thumbnail_test1",
      amenities: ["test_amenity_1", "test_amenity_2", "test_amenity_3"],
      region: "test_region_1",
      theme: "test_theme_1",
      viewMap: "view_map_test1",
    });
  });
});
