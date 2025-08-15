
interface Team {
    _id: string;
    author: {
        name: string;
        avatar: string;
        job: string;
    }
}

export const Team = () => {
    const team: Team[] = [
        {
            _id: "1",
            author: {
                name: "John Doe",
                avatar: "/team/ceo.jpg",
                job: "CEO"
            }
        },
        {
            _id: "2",
            author: {
                name: "Tom Hardy",
                avatar: "/team/founder.jpg",
                job: "Founder"
            }
        },
        {
            _id: "4",
            author: {
                name: "Bob Brown",
                avatar: "/team/manager.jpg",
                job: "Manager"
            }
        }
    ];

    return (
        <div className="bg-[#e7e7e7]">
            <div className="py-8 px-[5%]">
            <h1 className="text-xl md:text-3xl font-bold">Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                 {team.map(team => (
                            <div key={team._id} className="bg-white  rounded-md shadow p-4">
                                <div className="flex  gap-4 flex-col">
                                    <img src={team.author.avatar} alt={team.author.name} className="w-full h-[400px] rounded-md object-center object-cover" />
                                    <div>
                                        <p className="font-semibold">{team.author.name}</p>
                                        <p className="text-sm text-muted-foreground">{team.author.job}</p>
                                    </div>
                                </div>
                            </div>
                    ))}
            </div>
        </div>
        </div>
    );
}
