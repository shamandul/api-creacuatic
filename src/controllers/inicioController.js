const controller = {};

controller.inicio = (req, res)=>{
    res.render('inicio');
};
controller.info = (req, res)=>{
    res.render('info');
};


module.exports = controller;