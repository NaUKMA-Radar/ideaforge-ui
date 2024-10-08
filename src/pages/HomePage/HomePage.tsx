import { FC } from 'react';
import styles from './styles.module.css';
import Navbar from 'components/Navbar/Navbar';
import { navbarLinks } from 'utils/app.utils';
import { DefaultListMarkerIcon } from 'components/Icons/Icons';
import Footer from 'components/Footer/Footer';
import { Button, TextInput } from 'components/UI';

const HomePage: FC = () => {
  return (
    <main className='relative flex bg-white dark:bg-dark-primary'>
      <div className='absolute z-0 w-full h-full overflow-hidden'>
        <div className={styles.image_1}></div>
        <div className={styles.vector_1} />
        <div className={styles.vector_2} />
        <div className={styles.image_2} />
        <div className={styles.image_3} />
        <div className={styles.vector_3} />
        <div className={styles.image_4} />
        <div className={styles.vector_4} />
        <div className={styles.image_5} />
        <div className={styles.vector_5} />
        <div className={styles.image_6} />
        <div className={styles.image_7} />
      </div>
      <div className='relative z-50 flex flex-col w-full'>
        <Navbar links={navbarLinks} className='sticky top-0 z-50 flex justify-center w-full' />
        <div className='relative px-40 mt-[calc(228_*_(100vw_/_1440))] min-[1920px]:max-w-[1200px] max-w-[1050px]'>
          <h3 className='uppercase text-green-primary font-mono font-[700] text-8xl min-[1920px]:text-9xl'>
            Innovation
          </h3>
          <p className='text-white font-[600] text-3xl min-[1920px]:text-4xl mt-5 leading-[43.65px]'>
            is your key to success. We know what innovations are - and we will show it to you.
          </p>
          <Button
            uppercase={true}
            size='xl'
            className=''
          >
          Start
          </Button>
        </div>
        <div className='relative grid md:grid-cols-2 self-center items-center px-40 mt-[calc(909_*_(100vw_/_1440))]'>
          <div className='flex justify-center'>
            <h3 className='text-green-primary font-mono font-[700] text-[5rem] min-[1920px]:text-[7.5rem]'>
              Who we are
            </h3>
          </div>
          <p className='text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
            IDEAFORGE is a platform tailored for ecosystem foundations and funds managing multiple
            project, offering a unique blend of automation, standartization, and quality
          </p>
        </div>
        <div className='relative grid md:grid-cols-2 self-center gap-14 items-center px-40 mt-[calc(726_*_(100vw_/_1440))]'>
          <ul className='flex flex-col gap-10'>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                lack of standartized documents
              </p>
            </li>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                insufficient preparation for a meeting with investors
              </p>
            </li>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                difficulties in managing the development process
              </p>
            </li>
          </ul>
          <div className='flex justify-center flex-1 ps-20'>
            <h3 className='text-green-primary font-mono font-[700] text-[5rem] min-[1920px]:text-[7.5rem]'>
              Problems we solve
            </h3>
          </div>
        </div>
        <div className='relative grid md:grid-cols-2 self-center gap-14 items-center px-40 mt-[calc(700_*_(100vw_/_1440))]'>
          <h3 className='text-green-primary font-mono font-[700] text-[5rem] min-[1920px]:text-[7.5rem]'>
            What we offer
          </h3>
          <ul className='flex flex-col gap-10'>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                structured workflow
              </p>
            </li>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                standartization of documents effective development
              </p>
            </li>
            <li className='flex items-center gap-5'>
              <DefaultListMarkerIcon className='text-green-primary size-16' />
              <p className='inline-flex flex-1 text-white font-[600] text-3xl min-[1920px]:text-5xl leading-[43.85px] min-[1920px]:leading-[60px]'>
                management through DAO and MultiSig
              </p>
            </li>
          </ul>
        </div>
        <div className='relative flex flex-col self-center gap-14 items-center px-40 top-[calc(400_*_(100vw_/_1440))]'>
          <h3 className='text-green-primary font-mono font-[700] text-[5rem] min-[1920px]:text-[7.5rem]'>
            Key features
          </h3>
          <div className='grid md:grid-cols-2 mt-10 gap-20 min-[1920px]:gap-40 min-[1920px]:mt-20'>
            <div className='p-10 text-white bg-gradient-white-purple rounded-3xl'>
              <h4 className='mb-5 font-[600] text-center text-3xl min-[1920px]:text-4xl'>
                AI-powered guidance
              </h4>
              <p className='text-2xl min-[1920px]:text-3xl'>
                Our AI-driven tools offer personalized recommendations and insights guiding you
                through each stage of project development with precision.
              </p>
            </div>
            <div className='p-10 text-white bg-gradient-purple-white rounded-3xl'>
              <h4 className='mb-5 font-[600] text-center text-3xl min-[1920px]:text-4xl'>
                Investor-Ready Preparation
              </h4>
              <p className='text-2xl min-[1920px]:text-3xl'>
                Prepare comprehensive and professional documents that meet investor expectations,
                enhancing the appeal and readiness of your projects.
              </p>
            </div>
            <div className='p-10 text-white bg-gradient-white-purple rounded-3xl'>
              <h4 className='mb-5 font-[600] text-center text-3xl min-[1920px]:text-4xl'>
                DAO-Driven Governance
              </h4>
              <p className='text-2xl min-[1920px]:text-3xl'>
                Implement decentralised governance to facilitate transparent decision-making and
                collaboration among stakeholders, ensuring accountability.
              </p>
            </div>
            <div className='p-10 text-white bg-gradient-purple-white rounded-3xl'>
              <h4 className='mb-5 font-[600] text-center text-3xl min-[1920px]:text-4xl'>
                AgileWorkflow Integration
              </h4>
              <p className='text-2xl min-[1920px]:text-3xl'>
                Utilize Kanban boards to organize tasks, manage workflow, and ensure timely
                completion of project milestones, enhancing productivity and transparency.
              </p>
            </div>
          </div>
        </div>
        <div className='relative flex flex-col self-center gap-10 items-center px-40 mt-[calc(800_*_(100vw_/_1440))]'>
          <h3 className='text-green-primary font-mono font-[700] text-5xl min-[1920px]:text-7xl'>
            Any questions left?
          </h3>
          <p className='text-white font-[600] text-3xl min-[1920px]:text-4xl'>
            Fill in a quick form and we will call you in 15 minutes:
          </p>
          <form className='flex flex-col w-[433px] max-w-xl px-10 py-16 mt-10 border-gradient-primary rounded-[20px] before:rounded-[20px]'>
            <h5 className='text-white text-2xl min-[1920px]:text-3xl text-center'>
              Please fill in the details:
            </h5>
            <div className='flex flex-col gap-8 mt-10'>
              <TextInput
                className='p-5 !text-2xl min-[1920px]:!text-3xl font-mono font-normal'
                placeholder='Name'
              />
              <TextInput
                type='email'
                className='p-5 !text-2xl min-[1920px]:!text-3xl font-mono font-normal'
                placeholder='Email'
              />
              <TextInput
                className='p-5 !text-2xl min-[1920px]:!text-3xl font-mono font-normal'
                placeholder='Phone number'
              />
            </div>
            <div className='flex'>
              <Button
                type='button'
                size='lg'
                uppercase={true}
                className='w-full mt-10 rounded-3xl'
              >
                Call me
              </Button>
            </div>
          </form>
        </div>
        <Footer className='inline-flex relative h-[20px] w-full mt-[100px] p-10 justify-around bg-dark-secondary' />
      </div>
    </main>
  );
};

export default HomePage;
