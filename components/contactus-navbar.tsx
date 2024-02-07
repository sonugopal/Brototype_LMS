import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ContactUsForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer relative right-8 mx-4 h-10 w-10 flex items-center justify-center rounded-full bg-transparent hover:bg-[#292524]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                        We are Happy to Help!!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1  gap-4">
                    <Tabs defaultValue="Enquiry" className="w-full">
                        <TabsList>
                            <TabsTrigger value="Enquiry">Enquiry</TabsTrigger>
                            <TabsTrigger value="Location">Locations</TabsTrigger>
                        </TabsList>
                        <TabsContent className="h-full w-full" value="Enquiry">
                            <div className="grid">
                                <div className="grid grid-cols-2 gap-y-5 gap-x-10 my-4">
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">For Admission related queries</h1>
                                            <h3 className="line-clamp-3">Email:  <span
                                                onClick={() => navigator.clipboard.writeText('admissions@brototype.com')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                admissions@brototype.com
                                            </span></h3>
                                            <h3>Contact: +91 7034 395 811</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">For Official queries</h1>
                                            <h3 className="line-clamp-3">Email:  <span
                                                onClick={() => navigator.clipboard.writeText('talk@brototype.com')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                talk@brototype.com
                                            </span></h3>
                                            <h3>Contact: +91 7034 395 811</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">For Job opportunities</h1>
                                            <h3 className="line-clamp-3">Email:  <span
                                                onClick={() => navigator.clipboard.writeText('hr@brototype.com')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                hr@brototype.com
                                            </span></h3>
                                            <h3>Contact: +91 7594 846 113</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="Location">
                            <div className="grid">
                                <div className="grid grid-cols-2 gap-y-5 gap-x-10 my-4">
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Kochi (Headquarters)</h1>
                                            <h3>Edathuruthikaran Holdings, 10/450-2, Kundanoor, Maradu, Ernakulam, Kerala 682304</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Kozhikode</h1>
                                            <h3>Kinfra Techno Industrialpark Calicut University PO, Kakkanchery, Kerala 673635</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Trivandrum</h1>
                                            <h3>Dotspace Business Park, Kazhakkoottam, Thiruvananthapuram, Kerala 695585</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Bengaluru</h1>
                                            <h3>Hustlehub Tech Park, Sector 2, HSR Layout, Bengaluru, Karnataka 560102</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Coimbatore</h1>
                                            <h3>4st floor, 35/4, Desabandhu St, Ramarkovk, Ram Nagar, Coimbatore, Tamil Nadu 641009</h3>
                                        </div>
                                    </div>
                                    <div className="h-full w-full border hover:bg-[#292524]/50">
                                        <div className="m-2">
                                            <h1 className="my-2">Chennai</h1>
                                            <h3>Canyon coworking space, A4, Chandrasekaran avenue, 1st Main Rd, Thoraipakkam, Tamil Nadu 600097</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}
