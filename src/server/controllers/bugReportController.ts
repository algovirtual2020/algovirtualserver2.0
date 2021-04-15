import bugReportModel from '../models/BugReportModel';
import {Request, Response} from 'express';
import { json } from 'body-parser';

class BugReportCOntroller{

    public async getBugReports(req:Request, res:Response){
        try {
            let listBugReports = await bugReportModel.find().where("active").equals(true).exec();
            if(listBugReports.length === 0){
                
                return res.status(400).json({
                    ok: false,
                    err: {
                      message: "No existe ningun reporte activo ningun reporte",
                    },
                });
            }

            res.json({
                ok:true,
                reportBugs: listBugReports
            })

        } catch (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }    

    }

    public async getBugReport(req:Request, res:Response){
        let id = req.body.id;

        try {
            let bugReport = await bugReportModel.find().where("_id").equals(id).exec();

            // if (bugReport.length === 0) {
            //     return res.status(400).json({
            //       ok: false,
            //       err: {
            //         message: "There is no active Bug-report with this id",
            //       },
            //     });
            // }
            res.json({
                ok:true,
                bugReport: bugReport,
            })
        } catch (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
    }

    public async addBugReport(req:Request, res:Response){
        try {
            let bugReport = new bugReportModel();

            bugReport.user= req.body.user;
            bugReport.message= req.body.message;

            await bugReport.save((err, bugReportDB)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                return res.json({
                    ok:true,
                    bugReport: bugReportDB
                });
            });
            
        } catch (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }    
    }
    public async updateBugReport(req:Request, res:Response){
        try {
            
            let bugReportDb:any= await bugReportModel.findById(req.body.id);
            bugReportDb.active= false; 

            let bugReportUpdated= await bugReportDb.save();

            res.json({
                ok: true,
                bugReport: bugReportUpdated
            });
        } catch (err) {
             return res.status(500).json({
                ok: false,
                err,
            });
        }
    }

}
export const bugReportController = new BugReportCOntroller();