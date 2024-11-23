import Service from "../models/ServiceModel.js";

export const getAll = async (req, res) => {
  try {
    const response = await Service.findAll();
    if (response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Banners not found",
        data: [],
      });
    }

    const serviceData = response.map((service) => ({
      service_code: service.service_code,
      service_name: service.service_name,
      service_icon: service.service_icon,
      service_tariff: service.service_tarif,
    }));

    res.status(200).json({
      status: 200,
      message: "Success",
      data: serviceData,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      code: 500,
      status: true,
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};
