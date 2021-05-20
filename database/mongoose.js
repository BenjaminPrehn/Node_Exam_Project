const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/company_task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});