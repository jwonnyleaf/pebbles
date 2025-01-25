import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const NotFound = () => {
    return (
        <div className="not-found">
            <div style={{ backgroundColor: "#4B7A6C" }}>
                <div className="p-3"></div>
                <div className="grid grid-cols-12 gap-2">
                    <div>i will figure out how to extend the green to teh sides eventually....</div>
                    <div className="col-span-6 ...">
                        <Card style={{ backgroundColor: "#ECE3D3" }}>
                            <div className="p-3"></div>
                            <CardHeader>
                                <CardTitle>MISSING !</CardTitle>
                                <CardDescription>cat picture </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h1>404.</h1>
                                <p>cat not found</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-5 ...">OH NO !
                        <p>It looks like your cat got lost.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NotFound;