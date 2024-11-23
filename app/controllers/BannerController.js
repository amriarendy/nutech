import Banner from "../models/BannerModel.js";

export const getAll = async (req, res) => {
  try {
    const response = await Banner.findAll();
    if (response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Banners not found",
        data: [],
      });
    }

    const bannerData = response.map((banner) => ({
      banner_name: banner.banner_name,
      banner_image: banner.banner_image,
      description: banner.description,
    }));

    res.status(200).json({
      status: 200,
      message: "Success",
      data: bannerData,
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
