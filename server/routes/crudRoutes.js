const express = require("express");
const router = express.Router();
const crudController = require("../controllers/crudController");

router.get("/", crudController.crud_index);
router.get("/admin/grid", crudController.crud_get_admin);
router.get("/get_std_email", crudController.get_std_email);
router.post("/", crudController.crud_create_post);
router.get("/:id", crudController.crud_details);
router.patch("/:id", crudController.crud_update);
router.delete("/:id", crudController.crud_delete);
router.post("/admin", crudController.crud_create_admin);
router.get("/filter-view/:CGPA", crudController.crud_filter);
router.post("/sendEmail", crudController.sendEmail);
router.get("/detail/admin/:id", crudController.crud_admin_details);
router.put('/updateState',crudController.update_std_state);
module.exports = router;
