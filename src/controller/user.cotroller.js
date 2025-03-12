import teacherModel from "../models/teacher.js";
import teacherPositionmodel from "../models/teacherpositions.js";
import userModel from "../models/user.js"
import { generateRandomNumberString } from "../util/index.js";

const userController = {
    getAlluser: async (req, res) => {
        try {
            const allUsers = await userModel.find();
            console.log("Fetched users:", allUsers);

            res.status(200).json({ data: allUsers });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getData: async (req, res) => {
        try {
            const teachers = await teacherModel.find()
                .populate('userId', 'name email address phoneNumber isDeleted  identity ')
                .populate('teacherPositionsId', 'name')
                .lean();


            const formattedTeachers = teachers.map(teacher => ({
                identity: teacher?.code,
                state: teacher.userId?.isDeleted,
                inf: {
                    name: teacher.userId?.name || 'N/A',
                    email: teacher.userId?.email || 'N/A',
                    phone: teacher.userId?.phoneNumber || 'N/A',
                },


                address: teacher.userId?.address || 'N/A',
                isActive: teacher.isActive ? "Đang hoạt động" : "Không hoạt động",
                degrees: teacher.degrees.map(degree => ({
                    type: degree.type,
                    major: degree.major,
                    school: degree.school,
                    year: degree.year
                })),
                positions: teacher.teacherPositionsId.map(position => position.name).join(', ') || 'N/A'
            }));

            console.log(formattedTeachers);

            res.status(200).send({
                data: formattedTeachers
            })

        } catch (error) {
            console.error("Lỗi khi lấy danh sách giáo viên:", error);
        }
    },
    getJob: async (req, res) => {
        const allJobs = await teacherPositionmodel.find()

        res.status(200).send({
            data: allJobs
        })
    },

    addJob: async (req, res) => {
        const { code, des, isDeleted, isActive, name } = req.body

        const newjob = new teacherPositionmodel({
            code: code,
            des: des,
            isDeleted: isDeleted,
            isActive: isActive,
            name: name
        })

        await newjob.save()

        res.status(201).send({
            data: newjob
        })
    },
    createNewuser: async (req, res) => {
        const { name,
            email,
            phoneNumber,
            address,
            identity,
            dob,
            code,


            degrees } = req.body

            const existingUser = await userModel.findOne({ email: email });

            if (existingUser) {
              // Nếu email đã tồn tại, trả về lỗi
              return res.status(400).send({
                message: "Email đã tồn tại trong hệ thống. Vui lòng sử dụng email khác."
              });
            }

        const newuser = new userModel({
            name,
            email,
            phoneNumber,
            address,
            identity,
            dob,
            role: 'TEACHER'
        })

        await newuser.save()

        const allJobsid = await teacherPositionmodel.find({
            code: code
        })

        console.log(allJobsid)

        const ids = []
        allJobsid.map(item => {
            ids.push(item._id)
        })
        console.log(ids)

        const newteacher = new teacherModel({
            userId: newuser._id,
            code: generateRandomNumberString(),
            isActive: true,
            isDeleted: true,
            startDate: new Date(),
            degrees: degrees,
            teacherPositionsId: ids,
        })

        await newteacher.save()

        res.status(200).send({
            message: "Add dc rùi"
        })


    }

};

export default userController