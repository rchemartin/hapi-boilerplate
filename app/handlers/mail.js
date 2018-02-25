const nodeMailer = require('nodemailer');
const mailGen    = require('mailgen');

module.exports.emailCreate = (config, user) => {
    let email = {
        body : {
            name :  `${user.firstname} ${user.lastname}`,
            intro : `Bienvenue parmis nous ${user.login}` ,
            outro : 'Vous pouvez dès a présent vous connecter !',
        },
    };
    sendEmail(config, user.email, email, 'Bienvenue !');
};

module.exports.emailReset = (config, user) => {
    let email = {
        body : {
            name :  `${user.firstname} ${user.lastname}`,
            intro : `${user.login}, votre mot de passe vient d'être modifié` ,
            outro : 'Vous pouvez dès a présent vous connecter !',
        },
    };
    sendEmail(config, user.email, email, 'Mot de passe réinitialisé');
};

module.exports.emailEdit = (config, user) => {
    let email = {
        body : {
            name :  `${user.firstname} ${user.lastname}`,
            intro : `${user.login}, vos informations viennent d'être modifiées` ,
            outro : 'Vous pouvez dès a présent vous connecter !',
        },
    };
    sendEmail(config, user.email, email, 'Modification d\'informations');
};

const sendEmail = (config, dest, emailContent, title) => {
    let generator = new mailGen({
        product : {
            name : 'Fil Rouge',
            link : 'http://localhost:8080/documentation',
        },
        theme   : 'default',
    });

    let smtp = nodeMailer.createTransport({
        service: 'Gmail',
        auth : {
            user : config.user,
            pass : config.password,
        },
    });

    let mail = {
        from : config.user,
        to : dest,
        subject : title,
        text : generator.generatePlaintext(emailContent),
        html : generator.generate(emailContent),
    };

    smtp.sendMail(mail, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent !');
        }
        smtp.close();
    });
};


