export default {
    Query: {
        allTalks: async (parent, args, { Talk }) => {
            const talks = await Talk.find(args);

            return talks.map(talk => {
                talk._id = talk._id.toString();

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
        },
        upvoteTalk: async (parent, { id }, { Talk }) => {
            const talk = await Talk.findById(id);

            talk.set({
                votes: talk.votes ? talk.votes + 1 : 1
            });

            await talk.save();

            return talk
        },

        deleteTalk: async (parent, { id }, { Talk }) => {
            const talk = await Talk.remove(id);

            talk._id = talk._id.toString();

            return talk
        }
    }
};