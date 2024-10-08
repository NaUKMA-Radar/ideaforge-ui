import { FC, SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  solid?: boolean;
}

export const DefaultListMarkerIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='51'
      height='55'
      viewBox='0 0 51 55'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M32.7673 9.30185C32.7673 11.9029 29.4302 14.0181 25.3184 14.0181C21.2067 14.0181 17.8675 11.9029 17.8675 9.30185C17.8675 6.70081 21.2236 4.58331 25.3184 4.58331C29.4133 4.58331 32.7673 6.70081 32.7673 9.30185ZM32.7673 45.6981C32.7673 48.2991 29.4302 50.4166 25.3184 50.4166C21.2067 50.4166 17.8675 48.2991 17.8675 45.6981C17.8675 43.0971 21.2236 40.9819 25.3184 40.9819C29.4133 40.9819 32.7673 43.0971 32.7673 45.6981ZM14.579 20.9573C16.6897 17.011 16.7024 12.7371 14.6296 11.4423C12.5421 10.136 9.16491 12.2925 7.05627 16.2433C4.94553 20.1896 4.94553 24.4658 7.0035 25.7583C9.08892 27.0531 12.4661 24.9058 14.579 20.9573ZM43.6102 29.2279C45.6956 30.5066 45.6829 34.7004 43.5827 38.5802C41.4741 42.4623 38.0842 44.566 36.0115 43.2873C33.9134 42.0039 33.924 37.8125 36.022 33.9281C38.1328 30.0483 41.5247 27.9469 43.6102 29.2279ZM14.6402 43.3125C16.7256 42.0291 16.715 37.8377 14.6022 33.9579C12.5062 30.0758 9.11425 27.9721 7.03094 29.2531C4.93286 30.5479 4.94342 34.7256 7.05627 38.6054C9.15435 42.4898 12.5442 44.6073 14.6296 43.3239L14.6402 43.3125ZM43.6081 16.2594C45.7167 20.2056 45.7167 24.4681 43.6439 25.7606C41.5712 27.0691 38.1813 24.9264 36.0685 20.9641C33.9831 17.0133 33.9619 12.7554 36.0326 11.4583C38.118 10.1521 41.4952 12.2948 43.6081 16.2594Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const InstagramIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_17_27)'>
        <path
          d='M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z'
          fill='currentColor'
        />
        <path
          d='M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z'
          fill='currentColor'
        />
        <path
          d='M39.6937 11.1844C39.6937 12.7782 38.4 14.0625 36.8156 14.0625C35.2219 14.0625 33.9375 12.7688 33.9375 11.1844C33.9375 9.59065 35.2313 8.30627 36.8156 8.30627C38.4 8.30627 39.6937 9.60003 39.6937 11.1844Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_17_27'>
          <rect width='48' height='48' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TelegramIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M29.4022 2.83884L1.05169 13.828C-0.0891893 14.3397 -0.475064 15.3645 0.775936 15.9207L8.04906 18.244L25.6346 7.31965C26.5947 6.63384 27.5777 6.81671 26.7319 7.57115L11.6283 21.3171L11.1539 27.1343C11.5933 28.0325 12.3979 28.0367 12.9112 27.5903L17.0898 23.616L24.2464 29.0027C25.9086 29.9918 26.813 29.3535 27.1706 27.5405L31.8647 5.19865C32.3521 2.96709 31.5209 1.98384 29.4022 2.83884Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const TwitterIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <mask
        id='mask0_71_77'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='32'
        height='32'
      >
        <path d='M0 0H32V32H0V0Z' fill='currentColor' />
      </mask>
      <g mask='url(#mask0_71_77)'>
        <path
          d='M25.2 1.49951H30.1074L19.3874 13.7829L32 30.5007H22.1257L14.3863 20.3635L5.54057 30.5007H0.628571L12.0937 17.3578L0 1.5018H10.1257L17.1109 10.7658L25.2 1.49951ZM23.4743 27.5567H26.1943L8.64 4.29037H5.72343L23.4743 27.5567Z'
          fill='currentColor'
        />
      </g>
    </svg>
  );
};

export const GoogleIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_17_40)'>
        <path
          d='M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z'
          fill='#4285F4'
        />
        <path
          d='M10.5494 28.568L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1964L32.0936 36.1528C29.9554 37.5927 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.568Z'
          fill='#34A853'
        />
        <path
          d='M2.57436 13.2436C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7777 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5925 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2436Z'
          fill='#FBBC05'
        />
        <path
          d='M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z'
          fill='#EA4335'
        />
      </g>
      <defs>
        <clipPath id='clip0_17_40'>
          <rect width='48' height='48' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GithubIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_910_44)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_910_44'>
          <rect width='48' height='48' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlusIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='43'
      height='43'
      viewBox='0 0 43 43'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M32.25 23.2882H23.2917V32.2465C23.2917 32.7217 23.1029 33.1774 22.7669 33.5134C22.4309 33.8494 21.9752 34.0382 21.5 34.0382C21.0249 34.0382 20.5691 33.8494 20.2331 33.5134C19.8971 33.1774 19.7084 32.7217 19.7084 32.2465V23.2882H10.75C10.2749 23.2882 9.81914 23.0994 9.48314 22.7634C9.14714 22.4274 8.95837 21.9717 8.95837 21.4965C8.95837 21.0213 9.14714 20.5656 9.48314 20.2296C9.81914 19.8936 10.2749 19.7048 10.75 19.7048H19.7084V10.7465C19.7084 10.2713 19.8971 9.8156 20.2331 9.4796C20.5691 9.1436 21.0249 8.95483 21.5 8.95483C21.9752 8.95483 22.4309 9.1436 22.7669 9.4796C23.1029 9.8156 23.2917 10.2713 23.2917 10.7465V19.7048H32.25C32.7252 19.7048 33.1809 19.8936 33.5169 20.2296C33.8529 20.5656 34.0417 21.0213 34.0417 21.4965C34.0417 21.9717 33.8529 22.4274 33.5169 22.7634C33.1809 23.0994 32.7252 23.2882 32.25 23.2882Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const CrossIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='45'
      height='45'
      viewBox='0 0 45 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M31.6406 13.3594L13.3594 31.6406M13.3594 13.3594L31.6406 31.6406'
        stroke='currentColor'
        strokeWidth='2.34375'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const EditIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='37'
      height='36'
      viewBox='0 0 37 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7.82239 24L6.32239 30L12.3224 28.5L29.7014 11.121C30.2638 10.5585 30.5797 9.79553 30.5797 9.00004C30.5797 8.20454 30.2638 7.44162 29.7014 6.87904L29.4434 6.62104C28.8808 6.05862 28.1179 5.74268 27.3224 5.74268C26.5269 5.74268 25.764 6.05862 25.2014 6.62104L7.82239 24Z'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.82239 24L6.32239 30L12.3224 28.5L27.3224 13.5L22.8224 9L7.82239 24Z'
        fill='currentColor'
      />
      <path
        d='M22.8224 9L27.3224 13.5M19.8224 30H31.8224'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const RemoveIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
      />
    </svg>
  );
};

export const RocketIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='53'
      height='54'
      viewBox='0 0 53 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.3717 41.6202L14.388 37.8564C13.3912 37.1037 13.4724 34.9185 14.1773 32.2442L8.15835 33.1517L7.87445 30.9369L11.7226 25.8415L16.9842 25.0482C17.9243 23.1738 18.9698 21.4268 19.9866 20.0804C23.8348 14.985 32.3827 11.4386 36.1205 14.2615C39.8583 17.0844 38.7859 26.2764 34.9378 31.3718C33.9199 32.7195 32.5266 34.2017 30.9809 35.6189L31.6574 40.8967L27.8093 45.9921L25.6013 46.325L24.8274 40.2875C22.448 41.6971 20.3697 42.3739 19.3717 41.6202ZM18.8039 37.1907L16.7917 35.671C16.7894 35.5091 16.7949 35.3471 16.8083 35.1854C16.8877 34.1812 17.2244 32.7691 17.7814 31.1534C18.9183 27.8552 20.7901 24.1979 22.4785 21.9623C25.5551 17.8885 32.2578 15.3451 34.1964 16.8092C36.1351 18.2733 35.5225 25.4161 32.4459 29.4899C30.7576 31.7255 27.7509 34.5278 24.8906 36.5224C23.4877 37.4993 22.2238 38.2091 21.2774 38.5606C21.126 38.618 20.972 38.6679 20.8161 38.7103L18.8039 37.1907ZM26.5002 26.9999C27.1611 27.499 27.9976 27.7093 28.8257 27.5844C29.6539 27.4596 30.4058 27.0098 30.9161 26.3341C31.4264 25.6585 31.6533 24.8122 31.5468 23.9815C31.4403 23.1508 31.0092 22.4037 30.3483 21.9046C29.6874 21.4054 28.8509 21.1952 28.0228 21.32C27.1946 21.4449 26.4427 21.8946 25.9324 22.5703C25.4221 23.246 25.1952 24.0923 25.3017 24.923C25.4082 25.7537 25.8393 26.5008 26.5002 26.9999Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const CheckCirlceIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M43.2502 26.75C41.7502 34.25 36.0952 41.312 28.1602 42.89C24.2902 43.6607 20.2756 43.1908 16.6882 41.5472C13.1008 39.9036 10.1233 37.17 8.17987 33.7358C6.23639 30.3015 5.42594 26.3417 5.86392 22.42C6.30189 18.4984 7.96596 14.8149 10.6192 11.894C16.0612 5.90002 25.2502 4.25002 32.7502 7.25002" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.751 23.7501L25.251 31.2501L43.251 11.7501" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export const CameraIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg width="53" height="41" viewBox="0 0 53 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M47.625 4.625H38.25V0.875H14.8125V4.625H5.4375C4.11142 4.625 2.83965 5.15179 1.90197 6.08947C0.964284 7.02715 0.4375 8.29892 0.4375 9.625V35.5625C0.4375 36.8886 0.964284 38.1604 1.90197 39.098C2.83965 40.0357 4.11142 40.5625 5.4375 40.5625H47.625C48.9511 40.5625 50.2229 40.0357 51.1605 39.098C52.0982 38.1604 52.625 36.8886 52.625 35.5625V9.625C52.625 8.29892 52.0982 7.02715 51.1605 6.08947C50.2229 5.15179 48.9511 4.625 47.625 4.625ZM26.53 37.75C18.175 37.75 11.38 30.95 11.38 22.595C11.38 14.24 18.175 7.44 26.53 7.44C34.885 7.44 41.685 14.24 41.685 22.595C41.685 30.95 34.885 37.745 26.53 37.745V37.75ZM26.53 12.4375C25.1959 12.4377 23.875 12.7006 22.6425 13.2113C21.4101 13.7219 20.2903 14.4704 19.347 15.4138C18.4038 16.3573 17.6557 17.4772 17.1453 18.7098C16.6349 19.9424 16.3723 21.2634 16.3725 22.5975C16.3727 23.9316 16.6356 25.2525 17.1463 26.485C17.6569 27.7174 18.4054 28.8372 19.3488 29.7805C20.2923 30.7237 21.4122 31.4718 22.6448 31.9822C23.8774 32.4926 25.1984 32.7552 26.5325 32.755C29.2271 32.7547 31.8112 31.6839 33.7163 29.7783C35.6215 27.8727 36.6916 25.2883 36.6912 22.5938C36.6909 19.8992 35.6202 17.315 33.7146 15.4099C31.809 13.5048 29.2246 12.4347 26.53 12.435V12.4375Z" fill="white"/>
    </svg>
  )
}

export const XMarkIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      viewBox='0 0 41 41'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      strokeWidth='4'
      {...props}
    >
      <path d='M35 5L5 35' stroke='currentColor' strokeLinecap='round' />
      <path d='M5 5L35 35' stroke='currentColor' strokeLinecap='round' />
    </svg>
  );
};

export const ChevronLeftIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
    </svg>
  );
};

export const ChevronRightIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
    </svg>
  );
};

export const DocxIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      fill='#000000'
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 548.291 548.291'
      {...props}
    >
      <g>
        <path
          d='M486.201,196.121h-13.166v-63.525c0-0.399-0.062-0.795-0.115-1.2c-0.021-2.522-0.825-5-2.552-6.96L364.657,3.675
		c-0.033-0.031-0.064-0.042-0.085-0.073c-0.63-0.704-1.364-1.292-2.143-1.796c-0.229-0.157-0.461-0.286-0.702-0.419
		c-0.672-0.365-1.387-0.672-2.121-0.893c-0.2-0.052-0.379-0.134-0.577-0.188C358.23,0.118,357.401,0,356.562,0H96.757
		C84.894,0,75.256,9.649,75.256,21.502v174.613H62.092c-16.971,0-30.732,13.756-30.732,30.73v159.81
		c0,16.966,13.761,30.736,30.732,30.736h13.164V526.79c0,11.854,9.638,21.501,21.501,21.501h354.776
		c11.853,0,21.501-9.647,21.501-21.501V417.392h13.166c16.966,0,30.729-13.764,30.729-30.731v-159.81
		C516.93,209.877,503.167,196.121,486.201,196.121z M96.757,21.507h249.054v110.006c0,5.94,4.817,10.751,10.751,10.751h94.972
		v53.861H96.757V21.507z M367.547,335.847c7.843,0,16.547-1.701,21.666-3.759l3.916,20.301c-4.768,2.376-15.509,4.949-29.493,4.949
		c-39.748,0-60.204-24.73-60.204-57.472c0-39.226,27.969-61.055,62.762-61.055c13.465,0,23.705,2.737,28.31,5.119l-5.285,20.64
		c-5.287-2.226-12.615-4.263-21.832-4.263c-20.641,0-36.663,12.444-36.663,38.027C330.718,321.337,344.362,335.847,367.547,335.847z
		 M291.647,296.97c0,37.685-22.854,60.537-56.444,60.537c-34.113,0-54.066-25.759-54.066-58.495
		c0-34.447,21.995-60.206,55.94-60.206C272.39,238.806,291.647,265.248,291.647,296.97z M67.72,355.124V242.221
		c9.552-1.532,21.999-2.375,35.13-2.375c21.83,0,35.981,3.916,47.055,12.276c11.945,8.863,19.455,23.021,19.455,43.311
		c0,21.994-8.017,37.181-19.105,46.556c-12.111,10.058-30.528,14.841-53.045,14.841C83.749,356.825,74.198,355.968,67.72,355.124z
		 M451.534,520.968H96.757V417.392h354.776V520.968z M471.245,355.627l-10.409-20.804c-4.263-8.012-6.992-13.99-10.231-20.636
		h-0.342c-2.388,6.656-5.28,12.624-8.861,20.636l-9.552,20.804h-29.675l33.254-58.158l-32.054-56.786h29.849l10.058,20.984
		c3.413,6.979,5.963,12.614,8.694,19.092h0.335c2.729-7.332,4.955-12.446,7.843-19.092l9.721-20.984h29.683l-32.406,56.103
		l34.105,58.841H471.245z'
        />
        <path
          d='M141.729,296.277c0.165-23.869-13.814-36.494-36.15-36.494c-5.807,0-9.552,0.514-11.772,1.027v75.2
		c2.226,0.509,5.806,0.509,9.047,0.509C126.388,336.698,141.729,323.743,141.729,296.277z'
        />
        <path
          d='M208.604,298.493c0,22.515,10.575,38.372,27.969,38.372c17.567,0,27.617-16.703,27.617-39.045
		c0-20.641-9.885-38.377-27.801-38.377C218.827,259.448,208.604,276.162,208.604,298.493z'
        />
      </g>
    </svg>
  );
};

export const UserIcon: FC<IconProps> = ({ ...props }) => {
  return (
    // <svg viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
      />
    </svg>
  );
};

export const PencilIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M33.6606 14.8379C33.8528 14.6396 33.8478 14.3231 33.6496 14.1309L26.6515 7.34799C26.4532 7.1558 26.1367 7.16074 25.9445 7.35903L8.87794 24.9668C8.68575 25.1651 8.69069 25.4817 8.88898 25.6739L15.887 32.4568C16.0853 32.649 16.4019 32.644 16.594 32.4457L33.6606 14.8379ZM14.1041 33.788C14.5495 33.781 14.7641 33.2391 14.4443 32.929L8.462 27.1306C8.14214 26.8206 7.60711 27.0521 7.61407 27.4975L7.70601 33.3878C7.71032 33.6639 7.93765 33.8843 8.21376 33.8799L14.1041 33.788Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const SolidChevronDownIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg viewBox='0 0 19 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M10.2559 11.6271C9.85716 12.0876 9.14284 12.0876 8.74407 11.6271L0.540668 2.15465C-0.0202084 1.50701 0.439846 0.5 1.2966 0.5L17.7034 0.5C18.5602 0.5 19.0202 1.50701 18.4593 2.15465L10.2559 11.6271Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const CommentIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2.00002C6.477 2.00002 2 6.47702 2 12C1.99915 13.4734 2.3239 14.9288 2.951 16.262L2.021 20.799C1.98789 20.961 1.99546 21.1287 2.04304 21.287C2.09062 21.4454 2.17672 21.5895 2.29364 21.7064C2.41055 21.8233 2.55463 21.9094 2.71298 21.957C2.87133 22.0046 3.03901 22.0121 3.201 21.979L7.738 21.049C9.032 21.659 10.478 21.999 12 21.999C17.523 21.999 22 17.523 22 11.999C22 6.47702 17.523 1.99902 12 1.99902'
        fill='currentColor'
      />
    </svg>
  );
};

export const ThreeVerticalDotsIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg viewBox='0 0 4 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <circle cx='2' cy='18' r='2' fill='currentColor' />
      <circle cx='2' cy='10' r='2' fill='currentColor' />
      <circle cx='2' cy='2' r='2' fill='currentColor' />
    </svg>
  );
};

export const OpenedEyeIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
      />
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
    </svg>
  );
};

export const ClosedEyeIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
      />
    </svg>
  );
};

export const TrashIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
      />
    </svg>
  );
};

export const BellIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='80'
      height='80'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M41.5 11.5C41.5 10.1193 40.3807 9 39 9C37.6193 9 36.5 10.1193 36.5 11.5V13.5295C26.7791 14.0757 19.0648 22.1315 19.0648 31.989V49.6078C19.0648 50.5401 19.1945 51.4245 19.4337 52.2507L12.4782 60.4568C11.3767 61.7563 12.3003 63.75 14.0039 63.75H65.1257C66.8292 63.75 67.7528 61.7563 66.6513 60.4568L58.9124 51.3264C59.0122 50.7747 59.0648 50.2009 59.0648 49.6078V31.989C59.0648 22.0877 51.2818 14.0043 41.5 13.5227V11.5ZM44.0648 65.5C44.0648 66.1566 43.9354 66.8068 43.6841 67.4134C43.4329 68.02 43.0646 68.5712 42.6003 69.0355C42.136 69.4998 41.5848 69.8681 40.9782 70.1194C40.3715 70.3707 39.7214 70.5 39.0648 70.5C38.4081 70.5 37.758 70.3707 37.1513 70.1194C36.5447 69.8681 35.9935 69.4998 35.5292 69.0355C35.0649 68.5712 34.6966 68.02 34.4454 67.4134C34.1941 66.8068 34.0648 66.1566 34.0648 65.5H39.0648H44.0648Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const ArrowBackIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='80'
      height='80'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M32.7998 28.1455C34.2057 26.7396 34.2057 24.4602 32.7998 23.0544C31.3939 21.6485 29.1146 21.6485 27.7087 23.0544L14.5815 36.1816C12.4726 38.2904 12.4726 41.7095 14.5815 43.8183L27.7087 56.9455C29.1146 58.3514 31.3939 58.3514 32.7998 56.9455C34.2057 55.5396 34.2057 53.2603 32.7998 51.8544L24.5455 43.6H62.6541C64.6424 43.6 66.2541 41.9882 66.2541 40C66.2541 38.0118 64.6424 36.4 62.6541 36.4H24.5454L32.7998 28.1455Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const LogoutIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg {...props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15 12L2 12M2 12L5.5 9M2 12L5.5 15'
        stroke='#000000'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827'
        stroke='#000000'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export const DownloadIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width='76'
      height='106'
      viewBox='0 0 76 106'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M38 0C41.3137 0 44 2.68629 44 6V65.9547L62.0953 50.4445C64.6112 48.2879 68.399 48.5793 70.5555 51.0953C72.7121 53.6112 72.4207 57.399 69.9047 59.5555L43.2063 82.4399C40.2104 85.0078 35.7896 85.0078 32.7937 82.4399L6.09525 59.5555C3.5793 57.399 3.28793 53.6112 5.44446 51.0953C7.60099 48.5793 11.3888 48.2879 13.9047 50.4445L32 65.9547V6C32 2.68629 34.6863 0 38 0ZM6 94C2.68629 94 0 96.6863 0 100C0 103.314 2.68629 106 6 106H70C73.3137 106 76 103.314 76 100C76 96.6863 73.3137 94 70 94H6Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const InfoIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-6'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
      />
    </svg>
  );
};

export const FireIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z'
      />
    </svg>
  );
};

export const StarIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
      />
    </svg>
  );
};

export const ChevronDownIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      {...props}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
    </svg>
  );
};
