// import api from "./api/api";
// import { url_route } from "./api/routes";

// class UrlService {
//   async GetTableUrlsData() {
//     const response = await api.get(url_route);
//     return response.data;
//   }

//   async CreateShortUlr(originalUrl: string) {
//     return api
//       .post(url_route, { originalUrl })
//       .then((response) => response.data);
//   }

//   async GetUrlInfo(id: number) {
//     return api.get(`${url_route}/${id}`).then((response) => response.data);
//   }

//   async DeleteUrl(id: number) {
//     return api.delete(`${url_route}/${id}`).then((response) => response.data);
//   }
// }

// const urlServiceInstance = new UrlService();
export default {};
