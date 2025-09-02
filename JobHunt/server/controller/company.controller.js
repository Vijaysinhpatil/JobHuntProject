import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { CompanyName } = req.body;

    if (!CompanyName) {
      return res.status(400).json({
        message: "Company Name is Required..",
        success: false,
      });
    }

    //Finding the Comapny Name
    let company = await Company.findOne({ name: CompanyName });
    if (company) {
      return res.status(400).json({
        message: "You can not register same company",
        success: false,
      });
    }

    // don't someHow if we failed to find the company name then create a new companyName
    company = await Company.create({
      CompanyName: CompanyName,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Comapny Registered Successfully..!",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Error is Occured While Registering the Comapny", error);
  }
};

//getting perticular Companies which is choose by an user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //loggedIn user id
    const companies = await Company.find({ userId }); // it return an array of companies
    if (!companies) {
      return res.status(404).json({
        message: "Companies Not Registered Yet By an user",
        success: false,
      });
    }

    return res.status(200).json({
        message : "Company Details",
        success : true,
        Company : companies
    })
  } catch (err) {
    console.log("Error while Finding the Comapanies", err);

    return res.status(500).json({
      message: "Error while Finding the Comapanies",
      success: false,
    });
  }
};

//get Company By its Id

export const getCompanyById = async (req, res) => {
  try {
    //getting an id of each Comapny by using req.paramas.id methods
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found..!",
        success: false,
      });
    }

    //if we successed to find the Company
    return res.status(200).json({
        company,
        message : "Got All the Companies by its Id's",
        success : true
    })
  } catch (error) {
    console.log("Error while Getting the Comapny By its id" , error)
    return res.status(404).json({
        Error : "Error while Getting the Comapny By its id",
        success : false
    })
  }
};

//Updating the Company deatails by its id

export const updateCompany = async(req , res) => {
    try {
        
        const { CompanyName ,  description  , website , location} = req.body;
        //an importing a file for logo
        const file = req.file;

        //this is for the cloudanary Part
        
        const updatedData =  { CompanyName ,  description  , website , location}
        const company = await Company.findByIdAndUpdate(req.params.id , updatedData , { new : true })

        if(!company)
        {
            return res.status(404).json({
                message : "Company Not Found",
                success : false
            })
        }
        return res.status(200).json({
            message : "Updated Company Information",
            success : true
        })
    } catch (error) {
        console.log("Error While Updating Company information" , error);
        
            return res.status(404).json({
            Error : "Error While Updating Company information",
            success : false
       })

    }
}


