const SiginPage = () => {
  return (
    <div className="container flex min-h-screen max-w-2xl flex-col justify-center">
      {/* <CustomContainer customClassName="h-fit max-w-">
        <h1 className="mb-10 text-center text-2xl font-black text-woodSmoke-950 dark:text-slate-300">
          ورود
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            {...register("identifier", {
              required: {
                value: true,
                message: "وارد کردن نام کاربری الزامی است.",
              },
            })}
            startContent={<SelectionIcon width={20} height={20} />}
            placeholder="نام کاربری"
            errorMessage={errors.identifier?.message}
            isInvalid={!!errors.identifier?.message}
          />

          <PasswordInput
            {...register("password", {
              required: {
                value: true,
                message: "وارد کردن رمز عبور الزامی است.",
              },
            })}
            startContent={<SelectionIcon width={20} height={20} />}
            placeholder="رمز عبور"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            color="primary"
            className="!mt-10"
          >
            ورود
          </Button>
        </form>
      </CustomContainer> */}
    </div>
  );
};

export default SiginPage;
