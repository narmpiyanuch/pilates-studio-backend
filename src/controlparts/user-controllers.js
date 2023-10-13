const prisma = require("../utils/prisma");

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                firstName: true,
                lastName: true,
                mobile: true,
                email: true,
                profileImg: true,
                sessions: {
                    select: {
                        amount: true
                    }
                },
                transactions: {
                    select: {
                        status: true
                    }
                }
            }
        });
        res.status(200).json({ profile });
    } catch (err) {
        next(err);
    }
};
