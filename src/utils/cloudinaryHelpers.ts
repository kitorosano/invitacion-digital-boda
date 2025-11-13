export const lowQualityPhotoUrl = (photoUrl: string): string => {
  return photoUrl.replace(
    "/upload/",
    `/upload/c_fill,h_500,w_360/q_auto/f_auto/`,
  );
};

export const mediumQualityPhotoUrl = (photoUrl: string): string => {
  return photoUrl.replace(
    "/upload/",
    `/upload/c_fill,h_1000,w_720/q_auto/f_auto/`,
  );
};
