export default {
    Query: {
        allTalks: async (parent, args, { Talk }) => {
            const talks = await Talk.find();

            return talks.map(talk => {
                talk._id = talk._id.toString()

                return talk
            })
        },
        getTalk: async (parent, args, { Talk }) => {
            const talk = await Talk.findById(args.id);

            return talk;
        }
    },
    Mutation: {
        createTalk: async (parent, args, { Talk }) => {
            const talk = await new Talk(args).save();

            talk._id = talk._id.toString();

            return talk
        }
    }
};