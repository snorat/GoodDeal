const express = require("express");

const router = express.Router();

const uploadMiddleware = require("./middlewares/upload");

const userControllers = require("./controllers/userControllers");

const announceControllers = require("./controllers/announceControllers");
const newsletterControllers = require("./controllers/newsletterControllers");
const carbrandControllers = require("./controllers/carbrandControllers");
const carmodelControllers = require("./controllers/carmodelControllers");
const cartypeControllers = require("./controllers/cartypeControllers");
const imageControllers = require("./controllers/imageControllers");
const messageControllers = require("./controllers/messageControllers");
const favoriteControllers = require("./controllers/favoriteControllers");

const auth = require("./middlewares/auth");
const authannounce = require("./middlewares/authannounce");
const authServices = require("./services/authServices");

router.get("/announce/randomselection", announceControllers.carDisplay);

router.post("/favoris", auth.checkIfIsAllowed, favoriteControllers.add);
router.get("/favoris/:id", favoriteControllers.readFavorite);
router.get("/favoris", favoriteControllers.browse);
router.get("/favorisbyuser/:userId", favoriteControllers.readFavoritebyUser);
router.delete(
  "/favoris/:userId/:announceId",
  favoriteControllers.deleteFavorite
);
router.get(
  "/favorischeck/:userId/:announceId",
  favoriteControllers.favorisCheck
);

router.get("/carmodel", carmodelControllers.browse);
router.get("/carmodellistbybrand/:id", carmodelControllers.listModelByBrand);
router.get("/carbrand", carbrandControllers.browse);
router.get("/carmodelbybrand", carbrandControllers.modelsFromBrand);
router.get("/cartype", cartypeControllers.types);
router.get("/cartypes", cartypeControllers.browse);

router.get("/user", userControllers.browse);
// router.post("/user", userControllers.add);

router.delete("/user/:id", userControllers.destroy);
router.put(
  "/user/:id",
  // auth.checkIfIsAllowed,
  // auth.checkIfUser,
  // auth.checkIfGoodId,
  userControllers.edit
);
router.get(
  "/user/:id",
  auth.checkIfIsAllowed,
  auth.checkIfGoodIdBody,
  userControllers.read
);
// router.post(
//   "/checkauthwithbody",
//   auth.checkIfIsAllowed,
//   auth.checkIfGoodIdBody,
//   authServices.allowAccess
// );

router.get("/avatar/:id", userControllers.avatar);

router.post("/user", auth.validateUser, auth.hashPassword, userControllers.add);
router.post("/login", auth.checkEmailIfExist, userControllers.verifyPassword);
router.post("/logout", userControllers.deconnect);

router.post(
  "/test",
  uploadMiddleware.uploadFile,
  announceControllers.checkUpload
);

router.get("/announce", announceControllers.select);
router.get("/listAnnounces", announceControllers.browse);
router.post(
  "/announce",
  auth.checkIfIsAllowed,
  uploadMiddleware.uploadFile,
  authannounce.validateAnnounce,
  announceControllers.add
);
router.get(
  "/myAnnouncebyuser/:userId",
  announceControllers.readMyAnnouncebyUser
);
router.get(
  "/myAnnounceidbyuserid/:userId/:announceId",
  announceControllers.readMyAnnounceIdbyUserId
);
router.put(
  "/myAnnouncebyuser/:userId/:announceId",
  announceControllers.editAnnounce
);
router.delete(
  "/myAnnounce/:userId/:announceId",
  announceControllers.destroyAnnonce
);
// router.put("/announce/:id", auth.hashPassword, announceControllers.edit);

router.get("/checkauth", auth.checkIfIsAllowed, authServices.allowAccess); // checkifisallowed is a middleware, it has next so we need a endpoint allowaccess at last

router.get("/image", imageControllers.read);

router.post("/newsletter", newsletterControllers.add);
router.get("/newsletter/:id", newsletterControllers.read);

router.get("/announce/model/:model", announceControllers.searchByModel);
router.get("/announce/brand/:brand", announceControllers.searchByBrand);
router.get("/announce/type/:type", announceControllers.searchByType);
router.get("/announce/search/:searchTerm", announceControllers.search);
router.get("/announce/:id", announceControllers.getCarDetails);

router.post("/sendmessage", messageControllers.sendMessageBetweenUsers);
router.post("/sendautomaticmessage", messageControllers.sendAutomaticMessage);
router.get(
  "/messagecheck/:userId/:announceId",
  messageControllers.messageCheck
);
router.get(
  "/messages/:userId",
  auth.checkIfIsAllowed,
  auth.checkIfUser,
  auth.checkIfGoodId,
  messageControllers.listUserMessage
);

router.get(
  "/messages/sender/:userId/receiver/:receiverId/:announceId",
  auth.checkIfIsAllowed,
  auth.checkIfUser,
  auth.checkIfGoodId,
  messageControllers.listMessagesBetweenUsers
);

module.exports = router;
