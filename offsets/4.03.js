const OFFSET_wk_vtable_first_element     = 0x00D04580;
const OFFSET_wk_memset_import            = 0x028F9D38;
const OFFSET_wk___stack_chk_guard_import = 0x028F9A18;

const OFFSET_lk___stack_chk_guard        = 0x00069190;
const OFFSET_lk_pthread_create_name_np   = 0x00001B60;
const OFFSET_lk_pthread_join             = 0x0002FAD0;
const OFFSET_lk_pthread_exit             = 0x00020A80;
const OFFSET_lk__thread_list             = 0x000601A8;
const OFFSET_lk_sleep                    = 0x000237E0;
const OFFSET_lk_sceKernelGetCurrentCpu   = 0x00002D10;

const OFFSET_lc_memset                   = 0x000148F0;
const OFFSET_lc_setjmp                   = 0x0005E9B0;
const OFFSET_lc_longjmp                  = 0x0005EA00;

const OFFSET_WORKER_STACK_OFFSET         = 0x0007FB88;

let wk_gadgetmap = {
    "ret"    : 0x00000042,
    "pop rdi": 0x00043B7C,
    "pop rsi": 0x0008F33E,
    "pop rdx": 0x000156EA,
    "pop rcx": 0x00060DF3,
    "pop r8": 0x01262A4F,
    "pop r9" : 0x004E450C,
    "pop rax": 0x00084094,
    "pop rsp": 0x0005D293,

    "mov [rdi], rsi": 0x00118570,
    "mov [rdi], rax": 0x00C3A5C0,
    "mov [rdi], eax": 0x003FB6E6,

    "infloop": 0x000109E1,

    //branching specific gadgets
    "cmp [rcx], eax" : 0x00204122,
    "sete al"        : 0x00B7B735,
    "seta al"        : 0x000CCFB4,
    "setb al"        : 0x001B7657,
    "setg al"        : 0x000708c9,
    "setl al"        : 0x01517692,
    "shl rax, 3"     : 0x01A43F03,
    "add rax, rcx"   : 0x0008F9FD,
    "mov rax, [rax]" : 0x0142E309,
    "inc dword [rax]": 0x017629AF,
};

let syscall_map = {
    0x001: 0x34230, // sys_exit
    0x002: 0x351E0, // sys_fork
    0x003: 0x33400, // sys_read
    0x004: 0x33360, // sys_write
    0x005: 0x33A00, // sys_open
    0x006: 0x34030, // sys_close
    0x007: 0x32C20, // sys_wait4
    0x00A: 0x34D20, // sys_unlink
    0x00C: 0x346B0, // sys_chdir
    0x00F: 0x340B0, // sys_chmod
    0x014: 0x33580, // sys_getpid
    0x017: 0x33080, // sys_setuid
    0x018: 0x34690, // sys_getuid
    0x019: 0x33A40, // sys_geteuid
    0x01B: 0x33AE0, // sys_recvmsg
    0x01C: 0x33D10, // sys_sendmsg
    0x01D: 0x34860, // sys_recvfrom
    0x01E: 0x32F80, // sys_accept
    0x01F: 0x32DA0, // sys_getpeername
    0x020: 0x34EC0, // sys_getsockname
    0x021: 0x349E0, // sys_access
    0x022: 0x34B60, // sys_chflags
    0x023: 0x34530, // sys_fchflags
    0x024: 0x35410, // sys_sync
    0x025: 0x339E0, // sys_kill
    0x027: 0x33480, // sys_getppid
    0x029: 0x34A40, // sys_dup
    0x02A: 0x333D0, // sys_pipe
    0x02B: 0x35080, // sys_getegid
    0x02C: 0x353D0, // sys_profil
    0x02F: 0x32F20, // sys_getgid
    0x031: 0x32F00, // sys_getlogin
    0x032: 0x34790, // sys_setlogin
    0x035: 0x33140, // sys_sigaltstack
    0x036: 0x332A0, // sys_ioctl
    0x037: 0x34570, // sys_reboot
    0x038: 0x34470, // sys_revoke
    0x03B: 0x34770, // sys_execve
    0x041: 0x34110, // sys_msync
    0x049: 0x33900, // sys_munmap
    0x04A: 0x34670, // sys_mprotect
    0x04B: 0x337F0, // sys_madvise
    0x04E: 0x339C0, // sys_mincore
    0x04F: 0x32E80, // sys_getgroups
    0x050: 0x33420, // sys_setgroups
    0x053: 0x32E60, // sys_setitimer
    0x056: 0x32C80, // sys_getitimer
    0x059: 0x344D0, // sys_getdtablesize
    0x05A: 0x348E0, // sys_dup2
    0x05C: 0x33F10, // sys_fcntl
    0x05D: 0x33A60, // sys_select
    0x05F: 0x32EC0, // sys_fsync
    0x060: 0x33DF0, // sys_setpriority
    0x061: 0x33640, // sys_socket
    0x062: 0x346D0, // sys_connect
    0x063: 0x35040, // sys_netcontrol
    0x064: 0x32C40, // sys_getpriority
    0x065: 0x34C60, // sys_netabort
    0x066: 0x34FE0, // sys_netgetsockinfo
    0x068: 0x34CE0, // sys_bind
    0x069: 0x33F50, // sys_setsockopt
    0x06A: 0x33240, // sys_listen
    0x071: 0x34250, // sys_socketex
    0x072: 0x33C20, // sys_socketclose
    0x074: 0x353F0, // sys_gettimeofday
    0x075: 0x354D0, // sys_getrusage
    0x076: 0x32C00, // sys_getsockopt
    0x078: 0x33E90, // sys_readv
    0x079: 0x33CF0, // sys_writev
    0x07A: 0x34940, // sys_settimeofday
    0x07C: 0x33880, // sys_fchmod
    0x07D: 0x340F0, // sys_netgetiflist
    0x07E: 0x34FC0, // sys_setreuid
    0x07F: 0x33BE0, // sys_setregid
    0x080: 0x34B40, // sys_rename
    0x083: 0x33B60, // sys_flock
    0x085: 0x35430, // sys_sendto
    0x086: 0x35260, // sys_shutdown
    0x087: 0x345F0, // sys_socketpair
    0x088: 0x34390, // sys_mkdir
    0x089: 0x335E0, // sys_rmdir
    0x08A: 0x32AF0, // sys_utimes
    0x08C: 0x34F80, // sys_adjtime
    0x08D: 0x340D0, // sys_kqueueex
    0x093: 0x34330, // sys_setsid
    0x0A5: 0x32E20, // sys_sysarch
    0x0B6: 0x34DC0, // sys_setegid
    0x0B7: 0x32C60, // sys_seteuid
    0x0BC: 0x34E20, // sys_stat
    0x0BD: 0x35220, // sys_fstat
    0x0BE: 0x33C00, // sys_lstat
    0x0BF: 0x33300, // sys_pathconf
    0x0C0: 0x345B0, // sys_fpathconf
    0x0C2: 0x33B40, // sys_getrlimit
    0x0C3: 0x33720, // sys_setrlimit
    0x0C4: 0x34D40, // sys_getdirentries
    0x0CA: 0x34B20, // sys___sysctl
    0x0CB: 0x341D0, // sys_mlock
    0x0CC: 0x34BC0, // sys_munlock
    0x0CE: 0x33680, // sys_futimes
    0x0D1: 0x33C60, // sys_poll
    0x0E8: 0x32D20, // sys_clock_gettime
    0x0E9: 0x34190, // sys_clock_settime
    0x0EA: 0x35190, // sys_clock_getres
    0x0EB: 0x34D60, // sys_ktimer_create
    0x0EC: 0x334E0, // sys_ktimer_delete
    0x0ED: 0x35240, // sys_ktimer_settime
    0x0EE: 0x346F0, // sys_ktimer_gettime
    0x0EF: 0x338A0, // sys_ktimer_getoverrun
    0x0F0: 0x34C20, // sys_nanosleep
    0x0F1: 0x34450, // sys_ffclock_getcounter
    0x0F2: 0x33440, // sys_ffclock_setestimate
    0x0F3: 0x342D0, // sys_ffclock_getestimate
    0x0F7: 0x34CC0, // sys_clock_getcpuclockid2
    0x0FD: 0x34880, // sys_issetugid
    0x110: 0x35020, // sys_getdents
    0x121: 0x34730, // sys_preadv
    0x122: 0x33C80, // sys_pwritev
    0x136: 0x33980, // sys_getsid
    0x13B: 0x34E40, // sys_aio_suspend
    0x144: 0x33500, // sys_mlockall
    0x145: 0x34900, // sys_munlockall
    0x147: 0x33600, // sys_sched_setparam
    0x148: 0x34270, // sys_sched_getparam
    0x149: 0x32DC0, // sys_sched_setscheduler
    0x14A: 0x33C40, // sys_sched_getscheduler
    0x14B: 0x33AA0, // sys_sched_yield
    0x14C: 0x33040, // sys_sched_get_priority_max
    0x14D: 0x33160, // sys_sched_get_priority_min
    0x14E: 0x33390, // sys_sched_rr_get_interval
    0x154: 0x32B50, // sys_sigprocmask
    0x155: 0x32B90, // sys_sigsuspend
    0x157: 0x34A60, // sys_sigpending
    0x159: 0x34B80, // sys_sigtimedwait
    0x15A: 0x347C0, // sys_sigwaitinfo
    0x16A: 0x34DA0, // sys_kqueue
    0x16B: 0x33000, // sys_kevent
    0x17B: 0x32FA0, // sys_mtypeprotect
    0x188: 0x330C0, // sys_uuidgen
    0x189: 0x35510, // sys_sendfile
    0x18D: 0x33560, // sys_fstatfs
    0x190: 0x33120, // sys_ksem_close
    0x191: 0x33EB0, // sys_ksem_post
    0x192: 0x34750, // sys_ksem_wait
    0x193: 0x354F0, // sys_ksem_trywait
    0x194: 0x33260, // sys_ksem_init
    0x195: 0x34C80, // sys_ksem_open
    0x196: 0x34960, // sys_ksem_unlink
    0x197: 0x330E0, // sys_ksem_getvalue
    0x198: 0x34920, // sys_ksem_destroy
    0x1A0: 0x34E00, // sys_sigaction
    0x1A1: 0x34AA0, // sys_sigreturn
    0x1A5: 0x33780, // sys_getcontext
    0x1A6: 0x344B0, // sys_setcontext
    0x1A7: 0x345D0, // sys_swapcontext
    0x1AD: 0x337D0, // sys_sigwait
    0x1AE: 0x32EA0, // sys_thr_create
    0x1AF: 0x33200, // sys_thr_exit
    0x1B0: 0x33BA0, // sys_thr_self
    0x1B1: 0x33220, // sys_thr_kill
    0x1B9: 0x34840, // sys_ksem_timedwait
    0x1BA: 0x32B70, // sys_thr_suspend
    0x1BB: 0x334A0, // sys_thr_wake
    0x1BC: 0x34510, // sys_kldunloadf
    0x1C6: 0x35200, // sys__umtx_op
    0x1C7: 0x34F40, // sys_thr_new
    0x1C8: 0x34EA0, // sys_sigqueue
    0x1D0: 0x34800, // sys_thr_set_name
    0x1D2: 0x33DB0, // sys_rtprio_thread
    0x1DB: 0x33540, // sys_pread
    0x1DC: 0x34650, // sys_pwrite
    0x1DD: 0x34F20, // sys_mmap
    0x1DE: 0x34A20, // sys_lseek
    0x1DF: 0x33AC0, // sys_truncate
    0x1E0: 0x33520, // sys_ftruncate
    0x1E1: 0x32B10, // sys_thr_kill2
    0x1E2: 0x35490, // sys_shm_open
    0x1E3: 0x34F00, // sys_shm_unlink
    0x1E6: 0x33740, // sys_cpuset_getid
    0x1E7: 0x35300, // sys_cpuset_getaffinity
    0x1E8: 0x34AC0, // sys_cpuset_setaffinity
    0x1F3: 0x32EE0, // sys_openat
    0x203: 0x34590, // sys___cap_rights_get
    0x20A: 0x33FD0, // sys_pselect
    0x214: 0x34090, // sys_regmgr_call
    0x215: 0x33E10, // sys_jitshm_create
    0x216: 0x343F0, // sys_jitshm_alias
    0x217: 0x332E0, // sys_dl_get_list
    0x218: 0x34130, // sys_dl_get_info
    0x21A: 0x34070, // sys_evf_create
    0x21B: 0x334C0, // sys_evf_delete
    0x21C: 0x34410, // sys_evf_open
    0x21D: 0x33FF0, // sys_evf_close
    0x21E: 0x342B0, // sys_evf_wait
    0x21F: 0x34A80, // sys_evf_trywait
    0x220: 0x34430, // sys_evf_set
    0x221: 0x349A0, // sys_evf_clear
    0x222: 0x337B0, // sys_evf_cancel
    0x223: 0x34290, // sys_query_memory_protection
    0x224: 0x33B80, // sys_batch_map
    0x225: 0x33D90, // sys_osem_create
    0x226: 0x32D60, // sys_osem_delete
    0x227: 0x32CE0, // sys_osem_open
    0x228: 0x352E0, // sys_osem_close
    0x229: 0x34370, // sys_osem_wait
    0x22A: 0x34980, // sys_osem_trywait
    0x22B: 0x34610, // sys_osem_post
    0x22C: 0x33EF0, // sys_osem_cancel
    0x22D: 0x33CA0, // sys_namedobj_create
    0x22E: 0x339A0, // sys_namedobj_delete
    0x22F: 0x35570, // sys_set_vm_container
    0x230: 0x33460, // sys_debug_init
    0x233: 0x33DD0, // sys_opmc_enable
    0x234: 0x32E40, // sys_opmc_disable
    0x235: 0x33E50, // sys_opmc_set_ctl
    0x236: 0x33E70, // sys_opmc_set_ctr
    0x237: 0x348C0, // sys_opmc_get_ctr
    0x23C: 0x336E0, // sys_virtual_query
    0x249: 0x34D00, // sys_is_in_sandbox
    0x24A: 0x338C0, // sys_dmem_container
    0x24B: 0x34170, // sys_get_authinfo
    0x24C: 0x32CC0, // sys_mname
    0x24F: 0x332C0, // sys_dynlib_dlsym
    0x250: 0x335C0, // sys_dynlib_get_list
    0x251: 0x35060, // sys_dynlib_get_info
    0x252: 0x33F70, // sys_dynlib_load_prx
    0x253: 0x32F60, // sys_dynlib_unload_prx
    0x254: 0x34DE0, // sys_dynlib_do_copy_relocations
    0x256: 0x33D70, // sys_dynlib_get_proc_param
    0x257: 0x350C0, // sys_dynlib_process_needed_and_relocate
    0x258: 0x32B30, // sys_sandbox_path
    0x259: 0x336A0, // sys_mdbg_service
    0x25A: 0x33D30, // sys_randomized_path
    0x25B: 0x34BA0, // sys_rdup
    0x25C: 0x331A0, // sys_dl_get_metadata
    0x25D: 0x338E0, // sys_workaround8849
    0x25E: 0x330A0, // sys_is_development_mode
    0x25F: 0x34210, // sys_get_self_auth_info
    0x260: 0x354B0, // sys_dynlib_get_info_ex
    0x262: 0x35550, // sys_budget_get_ptype
    0x263: 0x333B0, // sys_get_paging_stats_of_all_threads
    0x264: 0x352C0, // sys_get_proc_type_info
    0x265: 0x32AD0, // sys_get_resident_count
    0x267: 0x33E30, // sys_get_resident_fmem_count
    0x268: 0x34EE0, // sys_thr_get_name
    0x269: 0x344F0, // sys_set_gpo
    0x26A: 0x341F0, // sys_get_paging_stats_of_all_objects
    0x26B: 0x32FE0, // sys_test_debug_rwmem
    0x26C: 0x33100, // sys_free_stack
    0x26E: 0x32D00, // sys_ipmimgr_call
    0x26F: 0x34150, // sys_get_gpo
    0x270: 0x35530, // sys_get_vm_map_timestamp
    0x271: 0x34AE0, // sys_opmc_set_hw
    0x272: 0x33620, // sys_opmc_get_hw
    0x273: 0x32CA0, // sys_get_cpu_usage_all
    0x274: 0x34310, // sys_mmap_dmem
    0x275: 0x336C0, // sys_physhm_open
    0x276: 0x33ED0, // sys_physhm_unlink
    0x278: 0x35470, // sys_thr_suspend_ucontext
    0x279: 0x33960, // sys_thr_resume_ucontext
    0x27A: 0x33920, // sys_thr_get_ucontext
    0x27B: 0x33A20, // sys_thr_set_ucontext
    0x27C: 0x33660, // sys_set_timezone_info
    0x27D: 0x343B0, // sys_set_phys_fmem_limit
    0x27E: 0x33760, // sys_utc_to_localtime
    0x27F: 0x35590, // sys_localtime_to_utc
    0x280: 0x34710, // sys_set_uevt
    0x281: 0x33280, // sys_get_cpu_usage_proc
    0x282: 0x33B00, // sys_get_map_statistics
    0x283: 0x348A0, // sys_set_chicken_switches
    0x286: 0x351C0, // sys_get_kernel_mem_statistics
    0x287: 0x343D0, // sys_get_sdk_compiled_version
    0x288: 0x32D40, // sys_app_state_change
    0x289: 0x34F60, // sys_dynlib_get_obj_member
    0x28C: 0x32DE0, // sys_process_terminate
    0x28D: 0x335A0, // sys_blockpool_open
    0x28E: 0x33340, // sys_blockpool_map
    0x28F: 0x34D80, // sys_blockpool_unmap
    0x290: 0x349C0, // sys_dynlib_get_info_for_libdbg
    0x291: 0x33A80, // sys_blockpool_batch
    0x292: 0x331E0, // sys_fdatasync
    0x293: 0x33700, // sys_dynlib_get_list2
    0x294: 0x35450, // sys_dynlib_get_info2
    0x295: 0x34C00, // sys_aio_submit
    0x296: 0x33180, // sys_aio_multi_delete
    0x297: 0x33FB0, // sys_aio_multi_wait
    0x298: 0x33060, // sys_aio_multi_poll
    0x299: 0x34B00, // sys_aio_get_data
    0x29A: 0x33F90, // sys_aio_multi_cancel
    0x29B: 0x32F40, // sys_get_bio_usage_all
    0x29C: 0x34630, // sys_aio_create
    0x29D: 0x350A0, // sys_aio_submit_cmd
    0x29E: 0x34FA0, // sys_aio_init
    0x29F: 0x34A00, // sys_get_page_table_stats
    0x2A0: 0x34E60, // sys_dynlib_get_list_for_libdbg
    0x2A1: 0x35000, // sys_blockpool_move
    0x2A2: 0x34E80, // sys_virtual_query_all
    0x2A3: 0x33F30, // sys_reserve_2mb_page
    0x2A4: 0x347E0, // sys_cpumode_yield
    0x2A5: 0x342F0, // sys_wait6
    0x2A6: 0x33D50, // sys_cap_rights_limit
    0x2A7: 0x33320, // sys_cap_ioctls_limit
    0x2A8: 0x34050, // sys_cap_ioctls_get
    0x2A9: 0x34820, // sys_cap_fcntls_limit
    0x2AA: 0x32FC0, // sys_cap_fcntls_get
    0x2AB: 0x35320, // sys_bindat
    0x2AC: 0x33B20, // sys_connectat
    0x2AD: 0x32D80, // sys_chflagsat
    0x2AE: 0x32BD0, // sys_accept4
    0x2AF: 0x331C0, // sys_pipe2
    0x2B0: 0x33BC0, // sys_aio_mlock
    0x2B1: 0x352A0, // sys_procctl
    0x2B2: 0x34550, // sys_ppoll
    0x2B3: 0x34490, // sys_futimens
    0x2B4: 0x34C40, // sys_utimensat
    0x2B5: 0x341B0, // sys_numa_getaffinity
    0x2B6: 0x34010, // sys_numa_setaffinity
    0x2C1: 0x33020, // sys_get_phys_page_size
    0x2C9: 0x35280, // sys_get_ppr_sdk_compiled_version
    0x2CC: 0x33860, // sys_openintr
    0x2CD: 0x34350, // sys_dl_get_info_2
    0x2CE: 0x33940, // sys_acinfo_add
    0x2CF: 0x32BB0, // sys_acinfo_delete
    0x2D0: 0x34BE0, // sys_acinfo_get_all_for_coredump
    0x2D1: 0x34CA0, // sys_ampr_ctrl_debug
    0x2D2: 0x32E00, // sys_workspace_ctrl
};

// Kernel stack offsets
const OFFSET_KERNEL_STACK_COOKIE                = 0x00000930;
const OFFSET_KERNEL_STACK_SYS_SCHED_YIELD_RET   = 0x00000808;

// Kernel text-relative offsets
const OFFSET_KERNEL_DATA                        = 0x00C00000;
const OFFSET_KERNEL_SYS_SCHED_YIELD_RET         = 0x0057D392;
const OFFSET_KERNEL_ALLPROC                     = 0x033EDCB8;
const OFFSET_KERNEL_SECURITY_FLAGS              = 0x07106474;
const OFFSET_KERNEL_TARGETID                    = 0x0710647D;
const OFFSET_KERNEL_QA_FLAGS                    = 0x07106498;
const OFFSET_KERNEL_UTOKEN_FLAGS                = 0x07106500;
const OFFSET_KERNEL_PRISON0                     = 0x02934D00;
const OFFSET_KERNEL_ROOTVNODE                   = 0x072E74C0;

const OFFSET_KERNEL_PS4SDK                      = 0x022ABE88;