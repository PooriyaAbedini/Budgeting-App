const express = require('express');
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();
const {
  getData,
  setChartData,
  deleteAllData,
  deleteData,
  getUserChartData,
  setMonthAllDaysRawData,
  setAnualRawData
} = require('../controllers/chartDataController')

router.route('/')
  .get(protect, getData)
  .post(protect, setChartData)
  .delete(protect, deleteAllData);
router.delete('/:id', protect, deleteData);
router.route('/userData')
  .get(protect, getUserChartData);
router.post('/userData/monthlyRawData', protect, setMonthAllDaysRawData)
router.post('/userData/anualRawData', protect, setAnualRawData);
module.exports = router