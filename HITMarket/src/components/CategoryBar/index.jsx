import * as Icons from '@material-ui/icons';



const CategoryBar = ({
    currentCategory,
    setCurrentCategory,
}) => {
    return (
        <div className="flex flex-column" >
            <Button className='flex flex-column' >
                <Icons.BorderAll />
            </Button>
        </div>
    )
}