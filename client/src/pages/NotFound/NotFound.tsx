import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

const NotFound = () => {
  return (
    <div className="grid min-h-svh bg-green text-lightgreen">
        <div className="grid grid-cols-12 place-content-center gap-10 ...">
          <div></div>
          <div className="col-span-6 ... text-black">
            <Card className = "bg-creme text-purple font-knewave flex flex-col items-center justify-center">
              <div className="p-2"></div>
              <CardHeader>
                <CardTitle className = "text-lg"><b>MISSING !</b></CardTitle>
              </CardHeader>
              <div className="p-2"> img place holder</div>
              <CardDescription>
                <p>cat not found.</p>
              </CardDescription>
              <CardContent>
                <h1><b>404.</b></h1>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-5 ... place-content-center">
            <p><b>Oh No!</b></p>
            <p><b>It looks like your cat got lost.</b></p>
            <p><b>Guess you got to move some pebbles to find them...</b></p>
          </div>
      </div>
    </div>
  );
};

export default NotFound;
