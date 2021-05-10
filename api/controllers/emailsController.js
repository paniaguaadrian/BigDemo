import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// const rimboEmail = "info@rimbo.rent";
// const testEmail = "paniaguasanchezadrian@gmail.com";
const testEmail = "gloriya@rimbo.rent";
// const testEmail = "victor@rimbo.rent";

// ! RJ1 Form => RJ3, RJ4, RJD Emails
const sendRJ1FormEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,

    tenantsNameTwo,
    tenantsEmailTwo,
    tenantsPhoneTwo,

    tenantsNameThree,
    tenantsEmailThree,
    tenantsPhoneThree,

    tenantsNameFour,
    tenantsEmailFour,
    tenantsPhoneFour,

    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    rentAmount,
    product,
    rentDuration,
    landlordName,
    landlordEmail,
    landlordPhone,
    randomID,
    randomIDTwo,
    randomIDThree,
    randomIDFour,
  } = req.body;

  const transporterRJ3 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterRJ4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterRJ4Two = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterRJ4Three = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterRJ4Four = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterRJD = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj3Email",
    },
    viewPath: "views/",
  };

  let optionsRJ4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4Email",
    },
    viewPath: "views/",
  };

  let optionsRJ4Two = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4EmailTwo",
    },
    viewPath: "views/",
  };

  let optionsRJ4Three = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4EmailThree",
    },
    viewPath: "views/",
  };

  let optionsRJ4Four = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4EmailFour",
    },
    viewPath: "views/",
  };

  let optionsRJD = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjdEmail",
    },
    viewPath: "views/",
  };

  transporterRJ3.use("compile", hbs(optionsRJ3));
  transporterRJ4.use("compile", hbs(optionsRJ4));
  transporterRJ4Two.use("compile", hbs(optionsRJ4Two));
  transporterRJ4Three.use("compile", hbs(optionsRJ4Three));
  transporterRJ4Four.use("compile", hbs(optionsRJ4Four));
  transporterRJD.use("compile", hbs(optionsRJD));

  // RJ3 Email  @PM/Agency
  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM/Agency email
    subject: "Rimbo Tenant Listing Successful",

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj3Email",
    context: {
      agencyContactPerson,

      tenantsName,
      tenantsEmail,
      tenantsPhone,

      tenantsNameTwo,
      tenantsEmailTwo,
      tenantsPhoneTwo,

      tenantsNameThree,
      tenantsEmailThree,
      tenantsPhoneThree,

      tenantsNameFour,
      tenantsEmailFour,
      tenantsPhoneFour,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
    },
  };
  transporterRJ3.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // RJ4 Email  @Tenant
  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenant's email
    subject: "Welcome to Rimbo!",
    //
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4Email",
    context: {
      tenantsName,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
      randomID,
    },
  };
  // RJ4 Email  @TenantTwo
  const tenantEmailTwo = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmailTwo, // tenant's email Two
    subject: "Welcome to Rimbo!",
    //
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4EmailTwo",
    context: {
      tenantsNameTwo,
      randomIDTwo,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
    },
  };
  // RJ4 Email  @TenantThree
  const tenantEmailThree = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmailThree, // tenant's email Three
    subject: "Welcome to Rimbo!",
    //
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4EmailThree",
    context: {
      tenantsNameThree,
      randomIDThree,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
    },
  };
  // RJ4 Email  @TenantFour
  const tenantEmailFour = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmailFour, // tenant's email Three
    subject: "Welcome to Rimbo!",
    //
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4EmailFour",
    context: {
      tenantsNameFour,
      randomIDFour,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
    },
  };

  // ! Logic to send emails up to 4 tenants
  if (
    tenantsNameTwo === "" &&
    tenantsNameTwo === null &&
    tenantsNameThree === "" &&
    tenantsNameThree === null &&
    tenantsNameFour === "" &&
    tenantsNameFour === null
  ) {
    transporterRJ4.sendMail(tenantEmail, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });
  } else if (
    tenantsNameThree === "" &&
    tenantsNameThree === null &&
    tenantsNameFour === "" &&
    tenantsNameFour === null
  ) {
    transporterRJ4.sendMail(tenantEmail, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Two.sendMail(tenantEmailTwo, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });
  } else if (tenantsNameFour === "" && tenantsNameFour === null) {
    transporterRJ4.sendMail(tenantEmail, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Two.sendMail(tenantEmailTwo, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Three.sendMail(tenantEmailThree, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });
  } else {
    transporterRJ4.sendMail(tenantEmail, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Two.sendMail(tenantEmailTwo, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Three.sendMail(tenantEmailThree, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });

    transporterRJ4Four.sendMail(tenantEmailFour, (err, data) => {
      if (err) {
        console.log("There is an error here...!" + err);
      } else {
        console.log("Email sent!");
      }
    });
  }

  // RJD Email  @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `New Tenant Listing by ${agencyName}`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjdEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,

      tenantsName,
      tenantsEmail,
      tenantsPhone,

      tenantsNameTwo,
      tenantsEmailTwo,
      tenantsPhoneTwo,

      tenantsNameThree,
      tenantsEmailThree,
      tenantsPhoneThree,

      tenantsNameFour,
      tenantsEmailFour,
      tenantsPhoneFour,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordPhone,
      landlordEmail,
    },
  };
  transporterRJD.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ2 Form => RJ9 Email
const sendRJ2FormEmails = async (req, res) => {
  const { tenantsName, tenantsEmail } = req.body;

  const transporterRJ9 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ9 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj9Email",
    },
    viewPath: "views/",
  };

  transporterRJ9.use("compile", hbs(optionsRJ9));

  // RJ9 email @Tenant
  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `Info Received! Your Rimbo Journey Has Begun!`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj9Email",
    context: {
      tenantsName,
    },
  };

  transporterRJ9.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ2 Form => RJXX3 Email with tenant's files attached
const sendRJ3FilesEmail = async (req, res) => {
  const {
    agencyName,
    agencyContactPerson,
    agencyPhonePerson,
    agencyEmailPerson,
    tenantsName,
    tenantsPhone,
    tenantsEmail,
    tenancyID,
    documentImageFront,
    documentImageBack,
    documentConfirmAddress,
    documentNumber,
    monthlyNetIncome,
    jobType,
    tenantsAddress,
    tenantsZipCode,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
    landlordName,
    landlordPhone,
    landlordEmail,
  } = req.body;

  const transporterRJXX3Files = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx3FilesEmail",
    },
    viewPath: "views/",
  };

  transporterRJXX3Files.use("compile", hbs(optionsRJXX3));

  // RJXX3 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `${tenantsName} ready for Screening`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx3FilesEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyPhonePerson,
      agencyEmailPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      tenancyID,
      documentImageFront,
      documentImageBack,
      documentConfirmAddress,
      documentNumber,
      monthlyNetIncome,
      jobType,
      tenantsAddress,
      tenantsZipCode,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordPhone,
      landlordEmail,
    },
  };

  transporterRJXX3Files.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJXX3 Email => RJ11 Email After Rimbo accepts tenant
const sendRJ11Emails = async (req, res) => {
  const {
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
    tenancyID,
    tenantsName,
    tenantsNameTwo,
    tenantsNameThree,
    tenantsNameFour,
  } = req.body;

  const transporterRJ11 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ11 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj11Email",
    },
    viewPath: "views/",
  };

  transporterRJ11.use("compile", hbs(optionsRJ11));

  // RJ11 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // pm's email
    subject: `Prospect Tenancy in ${rentalAddress} approved!`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj11Email",
    context: {
      agencyContactPerson,
      agencyEmailPerson,
      tenancyID,
      tenantsName,
      tenantsNameTwo,
      tenantsNameThree,
      tenantsNameFour,
    },
  };
  transporterRJ11.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  res.status(200).json();
};

// ! RJXX3 Email => RJ12 Email After Rimbo rejects tenant
const sendRJ12Emails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
    tenancyID,
    randomID,
  } = req.body;

  const transporterRJ12 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ12R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ12 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj12Email",
    },
    viewPath: "views/",
  };

  let optionsRJ12R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj12REmail",
    },
    viewPath: "views/",
  };

  transporterRJ12.use("compile", hbs(optionsRJ12));
  transporterRJ12R.use("compile", hbs(optionsRJ12R));

  // RJ12 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // pm's email
    subject: `Prospect Tenancy in ${rentalAddress} rejected.`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj12Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
      tenancyID,
      randomID,
    },
  };

  // RJ12 Email  @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // rimbo email
    subject: `Prospect Tenancy in ${rentalAddress} rejected.`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj12REmail",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      tenancyID,
      randomID,
    },
  };

  transporterRJ12.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ12R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ11 Email => RJXX4, RJ14 Emails Tenant approved by PM
const sendPMEmails = async (req, res) => {
  const {
    tenancyID,
    randomID,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    monthlyNetIncome,
    jobType,
    documentNumber,
    agencyContactPerson,
    agencyEmailPerson,
    agencyName,
    agencyPhonePerson,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
    landlordName,
    landlordEmail,
    landlordPhone,
  } = req.body;

  const transporterRJXX4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ14 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx4Email",
    },
    viewPath: "views/",
  };

  let optionsRJ14 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj14Email",
    },
    viewPath: "views/",
  };

  transporterRJXX4.use("compile", hbs(optionsRJXX4));
  transporterRJ14.use("compile", hbs(optionsRJ14));

  // RJXX4 Email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `Tenant Approved by ${agencyName}`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx4Email",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      monthlyNetIncome,
      jobType,
      documentNumber,
      agencyContactPerson,
      agencyEmailPerson,
      agencyName,
      agencyPhonePerson,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordEmail,
      landlordPhone,
    },
  };

  // RJ14 Email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenant Email
    subject: "Ready to move in? Rimbo it!",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj14Email",
    context: {
      agencyContactPerson,
      agencyName,
      rentalAddress,
      tenantsName,
      tenancyID,
      randomID,
    },
  };

  transporterRJXX4.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ14.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ11 Email => RJ13 Email to Rimbo informs that PM rejected tenant
const sendRJ13Email = async (req, res) => {
  const {
    tenantsName,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
    tenancyID,
    randomID,
  } = req.body;

  const transporterRJ13 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ13 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj13REmail",
    },
    viewPath: "views/",
  };

  transporterRJ13.use("compile", hbs(optionsRJ13));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo Email
    subject: `${agencyName} rejected tenancy after Rimbo Screening`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj13REmail",
    context: {
      tenantsName,
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
      tenancyID,
      randomID,
    },
  };

  transporterRJ13.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! E2R (email to Rimbo that informs tenant is on RJ3)
const sendNotificationRimbo = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmail",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  // RJ15 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsName}-Registration Start`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "E2REmail",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      agencyName,
      rentalAddress,
      randomID,
      tenancyID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ3 Form =>  RJ15 Email
const sendRJ3FormEmail = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJ15 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ15 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj15Email",
    },
    viewPath: "views/",
  };

  transporterRJ15.use("compile", hbs(optionsRJ15));

  // RJ15 email @Rimbo
  const RimbosEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `${tenantsName} Card successfully registered`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj15Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      randomID,
      tenancyID,
      agencyName,
      rentalAddress,
    },
  };

  transporterRJ15.sendMail(RimbosEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJXX5 Email TT
const sendRJ15EmailsTT = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJXX5 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX5 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx5Email",
    },
    viewPath: "views/",
  };

  transporterRJXX5.use("compile", hbs(optionsRJXX5));

  // RJXX5 email @Tenant
  const TenantsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `Card registered successfully!`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx5Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      agencyName,
      rentalAddress,
      randomID,
      tenancyID,
    },
  };

  transporterRJXX5.sendMail(TenantsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJ16 Email PM
const sendRJ15EmailsPM = async (req, res) => {
  const {
    agencyContactPerson,
    agencyEmailPerson,
    agencyName,
    tenancyID,
    tenantsName,
    tenantsNameTwo,
    tenantsNameThree,
    tenantsNameFour,
  } = req.body;

  const transporterRJ16 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ16 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj16Email",
    },
    viewPath: "views/",
  };

  transporterRJ16.use("compile", hbs(optionsRJ16));

  // RJ16 email @PM
  const PMsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: `Tenancy registration successfully completed`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj16Email",
    context: {
      agencyContactPerson,
      agencyEmailPerson,
      agencyName,
      tenancyID,
      tenantsName,
      tenantsNameTwo,
      tenantsNameThree,
      tenantsNameFour,
    },
  };

  transporterRJ16.sendMail(PMsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJS Form => RJ18 Email
const sendRJSFormEmail = async (req, res) => {
  const {
    agencyName,
    rentalAddress,
    tenantsName,
    pmAnex,
    tenancyID,
  } = req.body;

  const transporterRJS = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJS = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjsEmail",
    },
    viewPath: "views/",
  };

  transporterRJS.use("compile", hbs(optionsRJS));

  // RJ18 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `Rental Starting Prepare Aval`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjsEmail",
    context: {
      agencyName,
      rentalAddress,
      tenantsName,
      pmAnex,
      tenancyID,
    },
  };

  transporterRJS.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ17 email
const sendRJ18EmailTT = async (req, res) => {
  const { tenancyID, randomID, tenantsName, tenantsEmail } = req.body;

  const transporterRJ17 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ17 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj17Email",
    },
    viewPath: "views/",
  };

  transporterRJ17.use("compile", hbs(optionsRJ17));

  // RJ17 email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `Welcome to the Rimbo Family! Registration completed`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "General_Rules_and_Guidelines_Tenant_Rimbo_ENGLISH.pdf",
        path:
          "./views/images/General_Rules_and_Guidelines_Tenant_Rimbo_ENGLISH.pdf",
      },
    ],
    template: "rj17Email",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
    },
  };

  transporterRJ17.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ20 email
const sendRJ18EmailPM = async (req, res) => {
  const {
    tenancyID,
    randomID,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
  } = req.body;

  const transporterRJ20 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ20 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj20Email",
    },
    viewPath: "views/",
  };

  transporterRJ20.use("compile", hbs(optionsRJ20));

  // RJ20 email @PM
  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: `Amazing! The property is now covered by Rimbo`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "General_Rules_&_Guidelines_Landlord_RIMBO_ENGLISH.pdf",
        path:
          "./views/images/General_Rules_&_Guidelines_Landlord_RIMBO_ENGLISH.pdf",
      },
    ],
    template: "rj20Email",
    context: {
      tenancyID,
      randomID,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
    },
  };

  transporterRJ20.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

export {
  sendRJ1FormEmails,
  sendRJ2FormEmails,
  sendRJ11Emails,
  sendRJ12Emails,
  sendPMEmails,
  sendRJ13Email,
  sendRJ3FormEmail,
  sendRJ15EmailsTT,
  sendRJ15EmailsPM,
  sendRJSFormEmail,
  sendRJ3FilesEmail,
  sendRJ18EmailTT,
  sendRJ18EmailPM,
  sendNotificationRimbo,
};
