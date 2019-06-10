import SmartPopover from './SmartPopover'

if (process.env.NODE_ENV === "development") {
    console.log('%c 🎉🎉 SmartPopover init!', 'background: #00a1ff; padding: 1px 25px; color: #fff; border-radius: 4px;');
}

const install = (Vue, opts = {}) => {
    if (install.installed) return;
    Vue.component('SmartPopover', SmartPopover);
};

export default {
    install
}